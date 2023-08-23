import * as _ from 'lodash';
import { Component, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { Booking } from 'src/app/demo/api/booking';
import { BookingService } from 'src/app/shared/services/booking.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MESSAGE_TITLE, ROUTER, TOAST, LanguageFlag, LANGUAGES } from 'src/app/shared';
import { TranslationService } from '../../i18n';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterHelper } from 'src/app/core/helpers/filter.helper';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { STATUS } from 'src/app/shared/constants/status.constant';


@Component({
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.scss'],
    providers: [ConfirmationService, DialogService, ToastService, MessageService],
})
export class BookingListComponent {
    status: any[] = STATUS;
    language: LanguageFlag | undefined;
    langs = LANGUAGES;
    booking: Booking = {};
    bookings: Booking[] = [];
    isSkeleton: boolean = false;
    deleteProductsDialog: boolean = false;
    resetPageOnSort: boolean = false;
    submitted: boolean = false;
    keyToast: string = '';
    visible: boolean = false;
    formFilter!: FormGroup;
    bookingModel?: FormGroup;
    totalRecords: number = 0;
    firstPaging = 0;
    date: Date | undefined;

    constructor(
        private _fb: FormBuilder,
        private _bookingService: BookingService,
        private _toastService: ToastService,
        private _router: Router,
        public _dialogService: DialogService,
        private _detect: ChangeDetectorRef,
        private _notificationService: NotificationService,
    ) {}

    ngOnInit() {
        this.initForm();
        this.showSkeleton();
        this.getAllBooking();
        this.initKeyToast();
    }
    initForm(): void {
        this.formFilter = this._fb.group({
            keyword: [''],
            fromToTime: [''],
            bookingDate: [''],
            status: [''],
            pageNumber: [1],
            pageSize: [5],
            isExport: false,
            orderBy: [null]
        });
        this.bookingModel = this._fb.group({
            status: [],
        });
    }
    showSkeleton() {
        this.isSkeleton = true;
        setTimeout(() => {
            this.isSkeleton = false;
        }, 1000);
    }

    getAllBooking() {
        this._bookingService.getListBooking().subscribe((res) => {
            if (res.data && res.data.length) {
                this.bookings = res.data as Booking[];
            }
        });
    }

    initKeyToast() {
        this.keyToast = TOAST.KEY_BC;
    }

    handleDeleteBooking(id: string) {
        this._bookingService.getBookingById(id).subscribe({
            next: (data) => {
                if (!_.isEmpty(data)) {
                    this._bookingService.deleteBooking(id).subscribe((res) => {
                        if (res.succeeded) {
                            this.resetPageOnSort = true;
                            this.getAllBooking();
                            if (_.isEmpty(res.messages)) {
                                res.messages?.forEach((string: string) => {
                                    this._toastService.showSuccess(string, this.keyToast);
                                });
                            }
                        }
                    });
                }
            },
            error: (err) => {
                this.getAllBooking();
            },
        });
    }
    navigateToCreateBooking() {
        this._router.navigate([ROUTER.CREATE_BOOKING]);
    }
    navigateToCalender() {
        this._router.navigate([ROUTER.CALENDAR]);
    }

    navigateToEditBooking(booking: Booking) {
        this._router.navigate([ROUTER.EDIT_BOOKING + '/' + booking.id]);
    }

    navigateToDetailBooking(booking: Booking) {
        this._router.navigate([ROUTER.DETAIL_BOOKING + '/' + booking.id]);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    showDialog() {
        this.visible = true;
    }
    filter(event: any): void {
        if (event && event.first) {
            this.firstPaging = event.first;
        }
        event.sortField && FilterHelper.sortOrderByNoneMulti(this.formFilter, event.sortField, event.sortOrder);
        event.rows && FilterHelper.setPagingSize(this.formFilter, event.rows);
        (event.first || event.first === 0) &&
            event.rows &&
            FilterHelper.setPageNumber(this.formFilter, FilterHelper.getPageNumber(event.first, event.rows));
        this.filterBooking();
    }
    filterBooking() {
        this.isSkeleton = true;
        let param = FilterHelper.removeNullValue(this.formFilter.value);
        this._bookingService.filterBooking(param).subscribe({
            next: (res: any) => {
                this.bookings = res.data as Booking[];
                this.totalRecords = res.totalCount as number;
                if (this.bookings.length === 0) {
                    this._toastService.showWarningNoKey(MESSAGE_TITLE.LIST_EMPTY);
                }
                this.loadSkeletonTable();
                this._detect.detectChanges();
            },
            error: (error) => {
                error.error.messages.forEach((item: string) => {
                    this._toastService.showErrorNoKey(item);
                });
            },
        });
    }
    toastFormAnotherScreen() {
        const message = this._notificationService.getMessage();
        if (message) {
            this._toastService.showSuccessNoKey(message.toString());
            this._notificationService.clearMessage();
        }
    }

    confirmDelete(booking: Booking) {
        if (booking.id != -1 && booking.id != undefined) {
            this.booking = { ...booking };
            this.deleteProductsDialog = true;
        }
    }

    deleteConfirmed() {
        if (this.booking.id) {
            this._bookingService.deleteBooking(this.booking.id.toString()).subscribe({
                next: (next) => {
                    this._toastService.showSuccessNoKey(MESSAGE_TITLE.DELETE_SUCC);
                    this.filterBooking();
                    this.deleteProductsDialog = false;
                    this.booking = {};
                },
                error: (error) => {
                    this._toastService.showErrorNoKey(MESSAGE_TITLE.DELETE_ERR);
                },
            });
        }
    }

    loadSkeletonTable() {
        setTimeout(() => {
            this.isSkeleton = false;
        }, 1000);
    }

    clearFilter(): void {
        this.formFilter.reset();
        this.initForm();
        this.filterBooking();
    }
  
    onSelectionChange(selectedValue: any, id: number): void {
        const body = {
            id: id,
            bookingStatus: selectedValue.value,
        };
        this._bookingService.updateStatusBooking(body).subscribe({ next: (res) => {} });
    }
}
