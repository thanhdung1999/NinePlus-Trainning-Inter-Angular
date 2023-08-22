import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MESSAGE_ERROR_INPUT, MESSAGE_TITLE, ROUTER, TOAST } from 'src/app/shared';
import { cloneDeep } from 'lodash';
import { ToastService } from 'src/app/shared/services/toast.service';
import { BookingService } from 'src/app/shared/services/booking.service';
import { ServicesService } from 'src/app/shared/services/service.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SessionService } from 'src/app/core';
import { EqualsDateTime } from 'src/app/shared/validator/equal-date';
import { BookingCreate } from '../../api/booking-create';
import { Time, TimeActive } from 'src/app/shared/constants/active-time-spa';
import { Service } from '../../api/service';

@Component({
    selector: 'app-client-booking',
    templateUrl: './client-booking.component.html',
    styleUrls: ['./client-booking.component.scss'],
    providers: [ToastService, MessageService],
})
export class ClientBookingComponent {
    submitted: boolean = false;
    services: Service[] = [];
    name: Service[] = [];
    form!: FormGroup;
    keyToast: string = TOAST.KEY_BC;
    minDate!: Date;
    maxDate!: Date;
    customerId = '';
    isLoading = false;
    selectedServices!: Service[];
    totalMoney = 0;
    totalTime = 0;
    startTime!: Time[];
    endTime!: Time[];

    constructor(
        private _layoutService: LayoutService,
        private _bookingService: BookingService,
        private _sessionService: SessionService,
        private _serviceService: ServicesService,
        private _router: Router,
        private _toastService: ToastService,
        private _fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.getCustomerId();
        this.getListService();
        this.initFormAddBooking();
        this.initMinAndMaxDateBooking();
        this.initStartTimeAndEndTime();
    }

    initFormAddBooking() {
        this.form = this._fb.group(
            {
                customerId: [this.customerId],
                bookingDate: ['', Validators.required],
                fromTime: ['', Validators.required],
                toTime: ['', Validators.required],
                note: [''],
                serviceId: [[], Validators.required],
            },
            {
                validator: [EqualsDateTime.equalTime('fromTime', 'toTime')],
            }
        );
    }
    getCustomerId() {
        this.customerId = this._sessionService.userAuthenticate.userId;
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

    getListService() {
        this._serviceService.getListServices().subscribe((res) => {
            if (res.data && res.data.length > 0) {
                this.services = res.data as Service[];
            }
        });
    }

    handleValueDate(booking: BookingCreate) {
        booking.fromTime = this.convertTime(String(booking.bookingDate), booking.fromTime as Time);
        booking.toTime = this.convertTime(String(booking.bookingDate), booking.toTime as Time);
        booking.bookingDate = this.convertDate(booking);
        return booking;
    }

    onChangeService() {
        this.handleSumMoneyAndTimeServices(this.selectedServices);
    }

    handleSumMoneyAndTimeServices(services: Service[]) {
        this.totalMoney = services.reduce((accumulator: number, currentValue: Service) => {
            return accumulator + Number(currentValue.price);
        }, 0);
        this.totalTime = services.reduce((accumulator: number, currentValue: Service) => {
            return accumulator + Number(currentValue.time);
        }, 0);
    }

    createBooking() {
        this.isLoading = true;
        this.submitted = true;
        if (this.form.valid) {
            let bookingClone = cloneDeep(this.valueForm);
            if (this.form.value.serviceId.length > 0) {
                for (let i = 0; i < this.form.value.serviceId.length; i++) {
                    bookingClone.serviceId[i] = this.form.value.serviceId[i].id;
                }
            }
            bookingClone = this.handleValueDate(bookingClone as BookingCreate);
            this._bookingService.addBooking(bookingClone as BookingCreate).subscribe({
                next: (res) => {
                    this._toastService.showSuccess(MESSAGE_TITLE.ADD_SUCCESS, this.keyToast);
                    setTimeout(() => {
                        this._router.navigate([ROUTER.MY_BOOKING]);
                    }, 1000);
                },
                error: (error) => {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000);
                    if (error.error.messages && error.error.messages.length > 0) {
                        error.error.messages.forEach((item: string) => {
                            this._toastService.showError(item, this.keyToast);
                        });
                    }
                },
            });
        } else {
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        }
    }

    handleDeleteOneService(service: Service) {
        const services: Service[] = this.selectedServices.filter((item) => {
            return item !== service;
        });
        this.handleSumMoneyAndTimeServices(services);
        this.selectedServices = services;
    }

    convertDate(booking: BookingCreate) {
        const originalDate = new Date(booking.bookingDate + '');
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, '0');
        const day = String(originalDate.getDate()).padStart(2, '0');
        const hours = String(originalDate.getHours()).padStart(2, '0');
        const minutes = String(originalDate.getMinutes()).padStart(2, '0');
        const seconds = String(originalDate.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
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

    naviagateToLanding() {
        this._router.navigate([ROUTER.LANDING]);
    }
    get f() {
        return this.form.controls;
    }
    get valueForm() {
        return this.form.value;
    }
    get filledInput(): boolean {
        return this._layoutService.config.inputStyle === 'filled';
    }
}
