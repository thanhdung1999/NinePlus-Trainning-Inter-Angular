import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HandleString, MESSAGE_ERROR_INPUT, MESSAGE_TITLE, ROUTER, TOAST } from 'src/app/shared';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Customer } from '../../api/customer';
import { isEmpty } from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-customer',
    templateUrl: './profile-customer.component.html',
    styleUrls: ['./profile-customer.component.scss'],
    providers: [ToastService, MessageService],
})
export class ProfileCustomerComponent {
    submitted: boolean = false;

    isLoading = false;

    formUpdateCustomer!: FormGroup;

    keyToast = TOAST.KEY_BC;

    customerId = '';

    patternPhoneNumber = '[0-9]{10,11}';

    constructor(
        private _layoutService: LayoutService,
        private _customerService: CustomerService,
        private _sessionService: SessionService,
        private _toastService: ToastService,
        private _fb: FormBuilder,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.getIdCustomer();
        this.initFormUpdateCustomer();
    }

    getIdCustomer() {
        this.customerId = this._sessionService.userAuthenticate?.userId;
    }

    initFormUpdateCustomer() {
        this.formUpdateCustomer = this._fb.group({
            customerName: ['', [Validators.required, Validators.minLength(4)]],
            phoneNumber: ['', [Validators.required, Validators.pattern(this.patternPhoneNumber)]],
            address: [''],
            dateOfBirth: [''],
        });
    }

    trimValueCustomer(customer: Customer): Customer {
        if (customer.customerName) {
            customer.customerName = HandleString.trim(customer.customerName);
        }
        if (customer.address) {
            customer.address = HandleString.trim(customer.address);
        }
        // "The JSON value could not be converted to System.Nullable`1[System.DateTime]
        if (!customer.dateOfBirth) {
            delete customer['dateOfBirth'];
        } else {
            customer.dateOfBirth = this.convertDateOfBirth(customer);
        }
        return customer;
    }
    onSubmit() {
        this.submitted = true;
        if (this.formUpdateCustomer.valid) {
            const updateCustomer = this.trimValueCustomer(this.valueFormUpdateCustomer);
            // pending API BE
            // this.saveCustomer(updateCustomer);
        } else {
            this._toastService.showError(MESSAGE_ERROR_INPUT.VALID, this.keyToast);
        }
    }

    saveCustomer(customer: Customer) {
        this._customerService.updateCustomer(customer).subscribe({
            next: (res) => {
                if (!isEmpty(res.data)) {
                    this._toastService.showSuccess(MESSAGE_TITLE.EDIT_SUCC, this.keyToast);
                    window.location.reload();
                }
            },
            error: (err) => {
                this.showErrorResponse(err);
            },
        });
    }

    get filledInput(): boolean {
        return this._layoutService.config.inputStyle === 'filled';
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

    showErrorResponse(err: HttpErrorResponse): void {
        if (err.status === 400 && err.error?.messages?.length > 0) {
            err.error.messages?.forEach((ms: string) => {
                this._toastService.showError(ms, this.keyToast);
            });
        }
    }

    navigateToLanding() {
        this._router.navigate([ROUTER.LANDING]);
    }

    get f() {
        return this.formUpdateCustomer.controls;
    }

    get valueFormUpdateCustomer() {
        return this.formUpdateCustomer.value;
    }
}
