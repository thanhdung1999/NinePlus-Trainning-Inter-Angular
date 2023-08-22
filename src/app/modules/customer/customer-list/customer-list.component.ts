import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Customer } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { MESSAGE_TITLE, REGIX, ROUTER, TOAST } from 'src/app/shared';
import { ToastService } from 'src/app/shared/services/toast.service';
import { isEmpty } from 'lodash';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterHelper } from 'src/app/core/helpers/filter.helper';

@Component({
    templateUrl: './customer-list.component.html',
    providers: [ConfirmationService, DialogService, ToastService, MessageService],
})
export class CustomerListComponent implements OnInit {
    customers: Customer[] = [];

    submitted: boolean = false;

    isSkeleton: boolean = false;

    resetPageOnSort: boolean = false;

    keyToast = TOAST.KEY_BC;

    formFilter!: FormGroup;

    totalRecords: number = 0;

    firstPaging = 0;

    rgSearch: RegExp = REGIX.search;

    constructor(
        private _router: Router,
        private _confirmationService: ConfirmationService,
        public _dialogService: DialogService,
        private _customerService: CustomerService,
        private _toastService: ToastService,
        private _detect: ChangeDetectorRef,
        private _fb: FormBuilder
    ) {}

    ngOnInit() {
        this.initForm();
        this.showSkeleton();
    }

    initForm(): void {
        this.formFilter = this._fb.group({
            keyword: [''],
            pageNumber: [1],
            pageSize: [5],
            isExport: false,
            orderBy: [null],
        });
    }

    filter(event: any): void {

        if (event && event.first) {
            this.firstPaging = event.first;
        }
        event.rows && FilterHelper.setPagingSize(this.formFilter, event.rows);
        (event.first || event.first === 0) &&
            event.rows &&
            FilterHelper.setPageNumber(this.formFilter, FilterHelper.getPageNumber(event.first, event.rows));
        event.sortField && FilterHelper.sortOrderByNoneMulti(this.formFilter, event.sortField, event.sortOrder);
        this.filterCustomer();
    }

    filterCustomerNoOrderBy() {
        this.isSkeleton = true;
        let param = FilterHelper.removeNullValue(this.formFilter.value);
        if (param.orderBy) {
            delete param['orderBy'];
            this.resetPageOnSort = true;
        }
        this.firstPaging = 0;
        this._customerService.filterCustomer(param).subscribe({
            next: (res: any) => {
                this.customers = res.data as Customer[];
                this.totalRecords = res.totalCount as number;
                if (this.customers.length === 0) {
                    this._toastService.showWarning(MESSAGE_TITLE.LIST_EMPTY, this.keyToast);
                }
                this.showSkeleton();
                this._detect.detectChanges();
            },
            error: (error) => {
                if (error.error.messages && error.error.messages.length > 0) {
                    error.error.messages.forEach((item: string) => {
                        this._toastService.showError(item, this.keyToast);
                        this.isSkeleton = false;
                    });
                }
            },
        });
    }

    filterCustomer() {
        this.isSkeleton = true;
        let param = FilterHelper.removeNullValue(this.formFilter.value);
        this.firstPaging = 0;
        this._customerService.filterCustomer(param).subscribe({
            next: (res: any) => {
                this.customers = res.data as Customer[];
                this.totalRecords = res.totalCount as number;
                if (this.customers.length === 0) {
                    this._toastService.showWarning(MESSAGE_TITLE.LIST_EMPTY, this.keyToast);
                }
                this.showSkeleton();
                this._detect.detectChanges();
            },
            error: (error) => {
                if (error.error.messages && error.error.messages.length > 0) {
                    error.error.messages.forEach((item: string) => {
                        this._toastService.showError(item, this.keyToast);
                        this.isSkeleton = false;
                    });
                }
            },
        });
    }

    clearFilter(): void {
        this.formFilter.reset();
        this.initForm();
        this.filterCustomer();
    }

    showSkeleton() {
        this.isSkeleton = true;
        setTimeout(() => {
            this.isSkeleton = false;
        }, 2000);
    }

    handleDeleteCustomer(id: string) {
        this._customerService.getCustomerById(id).subscribe({
            next: (data) => {
                if (!isEmpty(data)) {
                    this._customerService.deleteCustomer(id).subscribe({
                        next: (res) => {
                            this.resetPageOnSort = true;
                            if (!isEmpty(res.messages)) {
                                res.messages?.forEach((string: string) => {
                                    this._toastService.showSuccess(string, this.keyToast);
                                });
                                this.filterCustomer();
                            }
                        },
                        error: (error) => {
                            error.error.messages.length > 0 &&
                                error.error.messages.forEach((messsage: string) => {
                                    this._toastService.showError(messsage, this.keyToast);
                                });
                        },
                    });
                }
            },
            error: (error) => {
                error.error.messages.length > 0 &&
                    error.error.messages.forEach((messsage: string) => {
                        this._toastService.showError(messsage, this.keyToast);
                    });
            },
        });
    }

    navigateToCreateCustomer() {
        this._router.navigate([ROUTER.CREATE_CUSTOMER]);
    }

    navigateToEditCustomer(customer: Customer) {
        this._router.navigate([ROUTER.EDIT_CUSTOMER + '/' + customer.id]);
    }

    navigateToDeatailCustomer(customer: Customer) {
        this._router.navigate([ROUTER.DETAIL_CUSTOMER + '/' + customer.id]);
    }

    showConfirmDelete(customer: Customer) {
        this._confirmationService.confirm({
            message: `${MESSAGE_TITLE.CONFIRM_DELETE} ${customer.customerName}?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            key: 'confirm',
            accept: () => {
                this.handleDeleteCustomer(customer.id + '');
                this._confirmationService.close();
            },
            reject: () => {
                this._confirmationService.close();
            },
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
