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
import { Time, TimeActive } from 'src/app/shared/constants/active-time-spa';
import { BookingCreate } from 'src/app/demo/api/booking-create';
import { EqualsDateTime } from 'src/app/shared/validator/equal-date';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

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
    submitted: boolean = false;
    form!: FormGroup;
    keyToast: string = 'bc';
    minDate!: Date;
    maxDate!: Date;
    startTime!: Time[];
    endTime!: Time[];

    constructor(
        private _bookingService: BookingService,
        private _serviceService: ServicesService,
        private _router: Router,
        private _toastService: ToastService,
        private _fb: FormBuilder,
        private _customerService: CustomerService,
        private _layoutService: LayoutService
    ) {}

    ngOnInit(): void {
        this.initFormAddBooking();
        this.getAllService();
        this.getAllCustomer();
        this.initMinAndMaxDateBooking();
        this.initStartTimeAndEndTime();
    }
    initFormAddBooking() {
        this.form = this._fb.group(
            {
                customerId: [[], Validators.required],
                bookingDate: ['', Validators.required],
                fromTime: ['', Validators.required],
                toTime: ['', Validators.required],
                note: [''],
                serviceId: [[], Validators.required],
            },
            {
                validator: EqualsDateTime.equalTime('fromTime', 'toTime'),
            }
        );
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

    createBooking(){
        if (this.form.valid) {
            this.convertBookingDate();
            let bookingClone = _.cloneDeep(this.form.value);
            if (this.form.value.serviceId.length > 0) {
                for (let i = 0; i < this.form.value.serviceId.length; i++) {
                    bookingClone.serviceId[i] = this.form.value.serviceId[i].id;
                }
            }
            bookingClone = this.handleValueDate(bookingClone as BookingCreate);
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

    initMinAndMaxDateBooking() {
        this.minDate = new Date();
        this.maxDate = new Date();
        this.maxDate.setDate(this.maxDate.getDate() + 30);
    }

    initStartTimeAndEndTime() {
        this.endTime = TimeActive.endTime() as Time[];
        this.startTime = TimeActive.startTime() as Time[];
    }
    navigateBackAllBooking() {
        this._router.navigate([ROUTER.LIST_BOOKING]);
    }
    convertBookingDate() {
        const bookingPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
        if (!bookingPattern.test(this.form.get('bookingDate')?.value)) this.convertBookingDateFormat();
    }

    convertBookingDateFormat() {
        const originalDate = new Date(this.form.get('bookingDate')?.value);
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, '0');
        const day = String(originalDate.getDate()).padStart(2, '0');
        const hours = String(originalDate.getHours()).padStart(2, '0');
        const minutes = String(originalDate.getMinutes()).padStart(2, '0');
        const seconds = String(originalDate.getSeconds()).padStart(2, '0');
        this.form.patchValue({
            bookingDate: `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`,
        });
    }
    handleValueDate(booking: BookingCreate) {
        booking.fromTime = this.convertTime(String(booking.bookingDate), booking.fromTime as Time);
        booking.toTime = this.convertTime(String(booking.bookingDate), booking.toTime as Time);
        booking.bookingDate = this.convertDate(booking);
        return booking;
    }
    convertDate(booking: BookingCreate) {
        const originalDate = new Date(booking.bookingDate + '');
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, '0');
        const day = String(originalDate.getDate()).padStart(2, '0');
       
        return `${year}-${month}-${day}T00:00:00`;
    }

    convertTime(date: string, time: Time): string {
        const originalDate = new Date(date);
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, '0');
        const day = String(originalDate.getDate()).padStart(2, '0');
        if (time && time.data) {
            const hours = String(time.data.getHours()).padStart(2, '0');
            const minutes = String(time.data.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}:00`;
        }
        return '';
    }

    get f() {
        return this.form.controls;
    }
    get filledInput(): boolean {
        return this._layoutService.config.inputStyle === 'filled';
    }
}
