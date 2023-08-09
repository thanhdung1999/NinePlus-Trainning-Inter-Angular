import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Customer } from 'src/app/demo/api/customer';
import { HandleString, MESSAGE_ERROR_INPUT, MESSAGE_TITLE, ROUTER, TOAST } from 'src/app/shared';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { cloneDeep } from 'lodash';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [MessageService, ToastService],
})
export class RegisterComponent {
    submitted: boolean = false;

    isLoadingSubmit = false;

    patternPhoneNumber = '[0-9]{10,11}';

    formCreateCustomer!: FormGroup;

    keyToast = TOAST.KEY_BC;

    constructor(
        private _layoutService: LayoutService,
        private _customerService: CustomerService,
        private _router: Router,
        private _toastService: ToastService,
        private _fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initFormCreateCustomer();
    }

    initFormCreateCustomer() {
        this.formCreateCustomer = this._fb.group({
            customerName: ['', [Validators.required, Validators.minLength(4)]],
            phoneNumber: ['', [Validators.required, Validators.pattern(this.patternPhoneNumber)]],
            address: [''],
            dateOfBirth: [''],
            username: ['', [Validators.required, Validators.minLength(8)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    onSubmit() {
        this.submitted = true;
        this.isLoadingSubmit = true;
        if (this.formCreateCustomer.valid) {
            const customerClone = cloneDeep(this.valueFormCreateCustomer);
            const newCustomer = this.trimValueCustomer(customerClone);
            if (this.isValidUsernameAndPassword(newCustomer) === true) {
                this.saveCustomer(newCustomer);
            }
        }
        setTimeout(() => {
            this.isLoadingSubmit = false;
        }, 1000);
    }

    trimValueCustomer(customer: Customer): Customer {
        if (customer.customerName) {
            customer.customerName = HandleString.trim(customer.customerName);
        }
        if (customer.address) {
            customer.address = HandleString.trim(customer.address);
        }
        // "The JSON value could not be co  nverted to System.Nullable`1[System.DateTime]
        if (!customer.dateOfBirth) {
            delete customer['dateOfBirth'];
        } else {
            customer.dateOfBirth = this.convertDateOfBirth(customer);
        }
        return customer;
    }

    isValidUsernameAndPassword(customer: Customer): boolean {
        const password = customer?.password;
        const username = customer?.username;
        if (!username && !password) {
            this._toastService.showError(MESSAGE_ERROR_INPUT.PASSWORD_OR_USERNAME_EMPTY, this.keyToast);
            return false;
        } else if (username && password) {
            if (username && username.length < 8) {
                this._toastService.showError(MESSAGE_ERROR_INPUT.MIN_LENGTH_USERNAME, this.keyToast);
                return false;
            }

            if (password && password.length < 8) {
                this._toastService.showError(MESSAGE_ERROR_INPUT.MIN_LENGTH_PASSWORD, this.keyToast);
                return false;
            }
        }
        return true;
    }

    saveCustomer(newCustomer: Customer) {
        this._customerService.postCustomer(newCustomer).subscribe({
            next: (res) => {
                this._toastService.showSuccess(MESSAGE_TITLE.ADD_SUCCESS, this.keyToast);
                setTimeout(() => {
                    this.navigateToLanding();
                }, 1500);
            },
            error: (err) => {
                this.showErrorResponse(err);
            },
        });
    }

    showErrorResponse(err: HttpErrorResponse): void {
        if (err.status === 400 && err.error?.messages?.length > 0) {
            err.error.messages?.forEach((ms: string) => {
                this._toastService.showError(ms, this.keyToast);
            });
        }
    }

    keyPressUsername(event: any) {
        let pattern = /[a-zA-Z0-9]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    keyPressPassword(event: any) {
        let pattern = /[a-zA-Z0-9\+\-@\!\$\&\*]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    navigateToLanding() {
        this._router.navigate([ROUTER.LANDING]);
    }

    convertDateOfBirth(customer: Customer) {
        const originalDate = new Date(customer?.dateOfBirth + '');
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, '0');
        const day = String(originalDate.getDate()).padStart(2, '0');
        const hours = String(originalDate.getHours()).padStart(2, '0');
        const minutes = String(originalDate.getMinutes()).padStart(2, '0');
        const seconds = String(originalDate.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    get f() {
        return this.formCreateCustomer.controls;
    }

    get valueFormCreateCustomer() {
        return this.formCreateCustomer.value;
    }

    get filledInput(): boolean {
        return this._layoutService.config.inputStyle === 'filled';
    }
}
