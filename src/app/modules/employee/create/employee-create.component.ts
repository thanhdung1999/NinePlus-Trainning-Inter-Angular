import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/shared';
import { MessageService } from 'primeng/api';
import { MESSAGE_TITLE } from 'src/app/shared';
import { Genders } from 'src/app/shared/constants/gender';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ROUTER } from 'src/app/shared';
import { UploadService } from 'src/app/shared/services/upload.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
<<<<<<<< HEAD:src/app/modules/employee/employee-create/employee-create.component.ts
const MESSAGE_WARNING = {
    REQUIRED_VALIDATION: 'Kiểm tra lại thông tin các trường bắt buộc nhập (*)',
};
========
>>>>>>>> 66cb026 ([SBFA-1] update translate for booking):src/app/modules/employee/create/employee-create.component.ts
@Component({
    selector: 'app-employee-create',
    templateUrl: './employee-create.component.html',
    styleUrls: ['./employee-create.component.scss'],
    providers: [MessageService, ToastService],
})
export class EmployeeCreateComponent {
    genders: any[] = Genders;
    form!: FormGroup;
    formImage!: FormGroup;
    date: string = '';
    keyToast: string = 'bc';
    fileUrl: string = ''
<<<<<<<< HEAD:src/app/modules/employee/employee-create/employee-create.component.ts

========
>>>>>>>> 66cb026 ([SBFA-1] update translate for booking):src/app/modules/employee/create/employee-create.component.ts
    constructor(
        private _router: Router,
        private _employeeService: EmployeeService,
        private _messageService: MessageService,
        private _fb: FormBuilder,
        private _toastService: ToastService,
        private _uploadService: UploadService,
<<<<<<<< HEAD:src/app/modules/employee/employee-create/employee-create.component.ts
        private _notificationService: NotificationService,
========
        private _notificationService: NotificationService
>>>>>>>> 66cb026 ([SBFA-1] update translate for booking):src/app/modules/employee/create/employee-create.component.ts
    ) { }

    ngOnInit() {
        this.initFormCreateEmployee();
    }

    initFormCreateEmployee() {
        const phone = /^(?:\+?84|0)(?:\d{9})$/;
        const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const password = /^.{8,}$/;
        this.form = this._fb.group({
            name: ['', Validators.compose([Validators.required])],
            gender: [null],
            birthday: [null],
            phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(phone)])],
            address: [''],
            email: ['', Validators.compose([Validators.required, Validators.pattern(email)])],
            image: [null],
            username: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required, Validators.pattern(password)])],
            workShiftId: [0, Validators.compose([Validators.required])],
        });
    }

    onFileSelect(event: any): void {
        const formData = new FormData();
        formData.append("file", event.files[0]);
        formData.append("filePath", event.files[0].name);
        this._uploadService.upLoadFile(formData).subscribe({
            next: (res: any) => {
<<<<<<<< HEAD:src/app/modules/employee/employee-create/employee-create.component.ts
                console.log(res.data);
                console.log(res.data.filePath);
                console.log(res.data.fileUrl);
                this.form.patchValue({
                    image: res.data.filePath
========
                this.form.patchValue({
                    imageFile: res.data.filePath
>>>>>>>> 66cb026 ([SBFA-1] update translate for booking):src/app/modules/employee/create/employee-create.component.ts
                })
                this.fileUrl = res.data.fileUrl;
            }, error: (error) => {
                error.error.Messages.forEach((item: string) => {
<<<<<<<< HEAD:src/app/modules/employee/employee-create/employee-create.component.ts
                    this._toastService.showError(item, this.keyToast);
========
                    this._toastService.showErrorNoKey(item);
>>>>>>>> 66cb026 ([SBFA-1] update translate for booking):src/app/modules/employee/create/employee-create.component.ts
                });
            }
        })
    }

    createEmployee() {
        if (this.form.valid) {
            if (this.form.get('birthday')?.value) {
                this.form.patchValue({
                    birthday: this.form.get('birthday')?.value.toISOString(),
                });
            }
            this._employeeService.createEmployee(this.form.value).subscribe({
                next: (res) => {
                    this._notificationService.addMessage(MESSAGE_TITLE.ADD_SUCC);
                    this.navigateBackEmployeeList();
                },
                error: (error) => {
<<<<<<<< HEAD:src/app/modules/employee/employee-create/employee-create.component.ts
                    console.log(error)
========
>>>>>>>> 66cb026 ([SBFA-1] update translate for booking):src/app/modules/employee/create/employee-create.component.ts
                    this.form.patchValue({ birthday: new Date(this.form.get('birthday')?.value) });
                    if (error.error.messages) {
                        error.error.messages.forEach((item: string) => {
                            this._toastService.showErrorNoKey(item);
                        });
                    } else {
                        error.error.Messages.forEach((item: string) => {
                            this._toastService.showErrorNoKey(item);
                        });
                    }
                }
            });
        } else {
<<<<<<<< HEAD:src/app/modules/employee/employee-create/employee-create.component.ts
            this._toastService.showError(MESSAGE_WARNING.REQUIRED_VALIDATION, this.keyToast);
========
            this._toastService.showError('Kiểm tra lại thông tin các trường (*)', this.keyToast);
>>>>>>>> 66cb026 ([SBFA-1] update translate for booking):src/app/modules/employee/create/employee-create.component.ts
        }
    }

    navigateBackEmployeeList() {
        this._router.navigate([ROUTER.LIST_EMPLOYEE]);
    }

}
