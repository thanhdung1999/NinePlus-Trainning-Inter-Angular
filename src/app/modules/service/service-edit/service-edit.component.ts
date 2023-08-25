import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SERVICE_TIME } from 'src/app/shared/constants/service-time';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/shared/services/service.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FilterHelper } from 'src/app/core/helpers/filter.helper';
import { MESSAGE_TITLE_VN, ROUTER } from 'src/app/shared';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss'],
  providers: [MessageService, ToastService, DecimalPipe],
})
export class ServiceEditComponent {
  keyToast = 'bc';
  form!: FormGroup;
  fileUrl: string = '';
  serviceTimes = SERVICE_TIME;
  fileUpload: any;
  checkValidImg: boolean = false;
  checkValidInput: boolean = false;
  loading: boolean = false;
  imageSelected: any[] = [];
  listImage: any[] = [];
  files!: any;

  constructor(private _fb: FormBuilder,
    private _router: Router,
    private _serviceService: ServicesService,
    private _toastService: ToastService,
    private _uploadService: UploadService,
    private _notificationService: NotificationService,
    private _activatedRoute: ActivatedRoute,
    private decimalPipe: DecimalPipe) {

  }

  ngOnInit() {
    this.initForm();
    this.getServiceById();
  }

  async updateService() {
    if (this.form.valid && this.listImage) {
      this.loading = true;
      let newServiceImageRequest;
      for (let i = 0; i < this.listImage.length; i++) {
        if (this.listImage[i].file) {
          const formData = new FormData();
          formData.append('file', this.listImage[i].file);
          formData.append('filePath', this.listImage[i].file.name);
          try {
            const res: any = await this._uploadService.upLoadFile(formData).toPromise();
            newServiceImageRequest = this._fb.group({
              typeFile: 'Image',
              nameFile: [res.data.filePath]
            });

          } catch (error: any) {
            this.loading = false;
            error.error.messages.forEach((item: string) => {
              this._toastService.showError(item, this.keyToast);
            });
          }
        } else {
          newServiceImageRequest = this._fb.group({
            typeFile: 'Image',
            nameFile: this.listImage[i].nameFile
          });
        }
        const servicesImageRequestsArray = this.form.get('servicesImageRequests') as FormArray;
        servicesImageRequestsArray.push(newServiceImageRequest);
      }
      let param = FilterHelper.removeNullValue(this.form.value);
      this._serviceService.updateService(param).subscribe({
        next: (res) => {
          this.buttonLoading();
        },
        error: (error) => {
          if (error.error.messages) {
            this.loading = false;
            error.error.messages.forEach((item: string) => {
              this._toastService.showError(item, this.keyToast);
            });
          }
        },
      });
    } else {
      this.checkValidImg = true;
      this.checkValidInput = true;
    }

  }

  initForm() {
    const name = /^[A-Za-zÀ-ỹ]+(?: [A-Za-zÀ-ỹ]+)*$/;
    this.form = this._fb.group({
      id: [''],
      name: ['', Validators.compose([Validators.required, Validators.maxLength(100), Validators.pattern(name)])],
      serviceTime: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      description: ['', Validators.maxLength(500)],
      servicesImageRequests: this._fb.array([]),
    });
  }

  getServiceById() {
    this._activatedRoute.paramMap.subscribe((next) => {
      const id = next.get('id');
      if (id) {
        this._serviceService.getServiceById(id).subscribe({
          next: (res) => {
            this.form.patchValue(res);
            this.listImage = res.images;
          },
          error: (error) => {
            error.error.Messages.forEach((item: string) => {
              this._toastService.showError(item, this.keyToast);
            });
          },
        });
      }
    });
  }

  removeImageSelected(index: number) {
    this.listImage = this.listImage.filter((_, i) => i !== index);
    if (!this.listImage.length) {
      this.checkValidImg = true
    }
  }

  uploadFile(event: any): void {
    this.convertToBase64InImageSelected(event.target.files);
    this.checkValidImg = false
  }

  convertToBase64InImageSelected(images: any) {
    const image = {}
    for (let i = 0; i < images.length; i++) {
      this.getBase64(images[i], image)

    }
  }

  getBase64(file: any, image: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      image = {
        nameFileLink: reader.result as string,
        file: file
      }
      this.listImage.push(image);
    };
    reader.onerror = function (error: any) {
      console.log('Error: ', error);
    };
  }
  navigateBackServiceList() {
    this._router.navigate([ROUTER.LIST_SERVICE]);
  }

  buttonLoading() {
    setTimeout(() => {
      this._notificationService.addMessage(MESSAGE_TITLE_VN.EDIT_SUCC);
      this.navigateBackServiceList();
      this.loading = false
    }, 1000);
  }
}
