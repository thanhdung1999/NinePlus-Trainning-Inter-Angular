import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HandleString, MESSAGE_ERROR_INPUT, MESSAGE_TITLE, ROUTER, TOAST } from 'src/app/shared';
import * as _ from 'lodash';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingService } from 'src/app/shared/services/booking.service';
import { Services } from 'src/app/demo/api/booking-detail';
import { ServicesService } from 'src/app/shared/services/service.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Customer } from 'src/app/demo/api/customer';

const MESSAGE_WARNING = {
    REQUIRED_VALIDATION: 'Kiểm tra lại thông tin các trường bắt buộc nhập (*)',
};

@Component({
    selector: 'app-booking-create',
    templateUrl: './booking-create.component.html',
    providers: [MessageService, ToastService],
})
export class BookingCreateComponent implements OnInit {
    service: Services[] = [];
    customer: Customer[] = [];
    selectedCustomer: Customer[] = [];
    name: Services[] = [];
    form!: FormGroup;
    keyToast: string = 'bc';

    constructor(
        private _bookingService: BookingService,
        private _serviceService: ServicesService,
        private _router: Router,
        private _toastService: ToastService,
        private _fb: FormBuilder,
        private _customerService: CustomerService
    ) {}

    ngOnInit(): void {
        this.initFormAddBooking();
        this.getAllService();
        this.getAllCustomer();
    }
    initFormAddBooking() {
        this.form = this._fb.group({
            customerId: [[], Validators.compose([Validators.required])],
            bookingDate: ['', Validators.compose([Validators.required])],
            fromTime: ['', Validators.compose([Validators.required])],
            totime: ['', Validators.compose([Validators.required])],
            note: [''],
            serviceId: [[], Validators.compose([Validators.required])],
        });
    }
    getAllService() {
        this._serviceService.getListServices().subscribe({
            next: (res) => {
                this.service = res.data as Services[];
                if (this.service.length === 0) {
                    this._toastService.showWarningNoKey(MESSAGE_TITLE.LIST_EMPTY);
                }
            },
            error: (error) => {
                error.error.messages.forEach((item: string) => {
                    this._toastService.showErrorNoKey(item);
                });
            },
        });
    }

    getAllCustomer() {
        this._customerService.getListCustomer().subscribe({
            next: (res) => {
                this.customer = res.data as Customer[];
                if (this.customer.length === 0) {
                    this._toastService.showWarningNoKey(MESSAGE_TITLE.LIST_EMPTY);
                }
            },
            error: (error) => {
                error.error.messages.forEach((item: string) => {
                    this._toastService.showErrorNoKey(item);
                });
            },
        });
    }

    createBooking() {
        if (this.form.valid) {
            const bookingClone = _.cloneDeep(this.form.value);
            if (this.form.value.serviceId.length > 0) {
                for (let i = 0; i < this.form.value.serviceId.length; i++) {
                    bookingClone.serviceId[i] = this.form.value.serviceId[i].id;
                }
            }
            this._bookingService.addBooking(bookingClone).subscribe({
                next: (res) => {
                    this.navigateBackAllBooking();
                    this._toastService.showSuccess(MESSAGE_TITLE.ADD_SUCCESS, this.keyToast);
                },
                error: (error) => {
                    if (error.error.messages) {
                        error.error.messages.forEach((item: string) => {
                            this._toastService.showError(item, this.keyToast);
                        });
                    }
                },
            });
        } else {
            this._toastService.showError(MESSAGE_WARNING.REQUIRED_VALIDATION, this.keyToast);
        }
    }
    navigateBackAllBooking() {
        this._router.navigate([ROUTER.LIST_BOOKING]);
    }
}
