import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HandleString, MESSAGE_ERROR_INPUT, MESSAGE_TITLE, ROUTER, TOAST } from 'src/app/shared';
import * as _ from 'lodash';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingService } from 'src/app/shared/services/booking.service';
import { BookingCreate } from 'src/app/demo/api/booking-create';
import { Services } from 'src/app/demo/api/booking-detail';
import { ServicesService } from 'src/app/shared/services/service.service';


@Component({
    selector: 'app-booking-create',
    templateUrl: './booking-create.component.html',
    providers: [MessageService, ToastService],
})
export class BookingCreateComponent implements OnInit {
    service: Services[] = [];
    name: Services[]=[];
    form!: FormGroup;
    keyToast: string = 'bc';

    constructor(
        private _bookingService: BookingService,
        private _serviceService: ServicesService,
        private _router: Router,
        private _toastService: ToastService,
        private _fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initFormAddBooking();
        this.getAllService();
    }
    initFormAddBooking() {
        this.form = this._fb.group({
            customerId: ['', Validators.required],
            bookingDate: ['', Validators.required],
            fromTime: ['', Validators.required],
            totime: ['', Validators.required],
            note: [''],
            serviceId: [[], Validators.required],
        });
    }
    getAllService() {
        this._serviceService.getListServices().subscribe((res) => {
            if (res.data && res.data.length) {
                this.service = res.data as Services[];
            }
            console.log(this.service);
        });
    }
    createBooking() {
        if (this.form.valid) {
            const formData = new FormData();
            Object.keys(this.form.controls).forEach((key) => {
                const control = this.form.get(key);
                if (control) {
                    formData.append(key, control.value);
                }
            });
            this._bookingService.addBooking(formData as BookingCreate).subscribe({
                next: (res) => {
                    this.navigateBackAllBooking();
                    this._toastService.showSuccess(MESSAGE_TITLE.ADD_SUCCESS, this.keyToast);
                },
                error: (error) => {
                    this.form.patchValue({ birthday: '' });
                    if (error.error.messages) {
                        error.error.messages.forEach((item: string) => {
                            this._toastService.showError(item, this.keyToast);
                        });
                    }
                },
            });
        }
        console.log(this.form);
    }
    navigateBackAllBooking() {
        this._router.navigate([ROUTER.LIST_BOOKING]);
    }
}
