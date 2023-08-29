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

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.scss'],
  providers: [MessageService, ToastService]
})
export class ServiceCreateComponent {
  keyToast = 'bc';
  form!: FormGroup;
  fileUrl: string = '';
  nameFile: string = '';
  serviceTimes = SERVICE_TIME;
  fileUpload: any;
  checkValidImg: boolean = false;
  checkValidInput: boolean = false;
  files!: any;
  imageSelected: any[] = [];
  loading: boolean = false;
  validImageNumber: boolean = false;
  constructor(private _fb: FormBuilder,
    private _router: Router,
    private _serviceService: ServicesService,
    private _toastService: ToastService,
    private _uploadService: UploadService,
    private _notificationService: NotificationService,) {

  }
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const name = /^[A-Za-zÀ-ỹ]+(?: [A-Za-zÀ-ỹ]+)*$/;
    this.form = this._fb.group({
      id: [0],
      name: ['', Validators.compose([Validators.required, Validators.maxLength(100), Validators.pattern(name)])],
      serviceTime: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      description: ['', Validators.maxLength(500)],
      servicesImageRequests: this._fb.array([]),
    });
  }

  async createService() {
    if (this.form.valid && this.files) {
      this.loading = true;
      for (let i = 0; i < this.files.length; i++) {
        const formData = new FormData();
        formData.append('file', this.files[i]);
        formData.append('filePath', this.files[i].name);
        try {
          const res: any = await this._uploadService.upLoadFile(formData).toPromise();
          const newServiceImageRequest = this._fb.group({
            typeFile: [this.files[i].name],
            nameFile: [res.data.filePath]
          });
          const servicesImageRequestsArray = this.form.get('servicesImageRequests') as FormArray;
          servicesImageRequestsArray.push(newServiceImageRequest);
        } catch (error: any) {
          this.loading = false;
          error.error.messages.forEach((item: string) => {
            this._toastService.showError(item, this.keyToast);
          });
        }
      }
      let param = FilterHelper.removeNullValue(this.form.value);
      this._serviceService.createService(param).subscribe({
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
      this.checkValidImg = !this.files;
      this.checkValidInput = true;
    }
  }

  removeImageSelected(event: any) {
    this.imageSelected = this.imageSelected.filter(base64 => base64.url != event.url);
    this.files = Array.from(this.files).filter(f => f != event.file)
    if (!this.files.length && !this.imageSelected.length) {
      this.checkValidImg = true
    } else if (this.files.length <= 5) {
      this.validImageNumber = false;
    }
  }

  uploadFile(event: any): void {
    if (this.files) {
      this.files = [...this.files, ...event.target.files]
    } else {
      this.files = event.target.files;
    }
    if (this.files.length && event.target.files.length) {
      this.imageSelected = [];
      this.convertToBase64InImageSelected();
      this.checkValidImg = false
    }
    if (this.files.length > 5) {
      this.validImageNumber = true;
    }
  }

  getBase64(file: any, image: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      image = {
        url: reader.result as string,
        file: file
      }
      this.imageSelected.push(image);
    };
    reader.onerror = function (error: any) {
      console.log('Error: ', error);
    };
  }

  convertToBase64InImageSelected() {
    const image = {}
    for (let i = 0; i < this.files.length; i++) {
      this.getBase64(this.files[i], image)
    }
  }

  navigateBackServiceList() {
    this._router.navigate([ROUTER.LIST_SERVICE]);
  }

  buttonLoading() {
    setTimeout(() => {
      this._notificationService.addMessage(MESSAGE_TITLE_VN.ADD_SUCC);
      this.navigateBackServiceList();
      this.loading = false
    }, 1000);
  }
}
