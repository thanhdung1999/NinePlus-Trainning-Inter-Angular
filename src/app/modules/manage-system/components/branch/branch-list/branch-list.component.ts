import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterHelper } from 'src/app/core/helpers/filter.helper';
import { Customer } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ModalMode } from 'src/app/shared';
import { Branch } from 'src/app/shared/models/branch';
import { BranchService } from 'src/app/shared/services/branch.service';
import { BranchCreateEditComponent } from '../branch-create-edit/branch-create-edit.component';

@Component({
    selector: 'app-branch-list',
    templateUrl: './branch-list.component.html',
    styleUrls: ['./branch-list.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class BranchListComponent {
    @ViewChild('modalCreateEditBranch')
    modalCreateEditBranch!: BranchCreateEditComponent;
    branch: Branch[] = [];
    branchDetail!: any;
    totalRecords: number = 0;
    firstPaging = 0;
    conditionForm!: FormGroup;
    isOpenModalCreateEdit = false;
    deleteProductDialog = false;
    delectItem!: any;
    isLoadingTable = false;
    constructor(
        private _branchService: BranchService,
        private router: Router,
        private _fb: FormBuilder,
        private _detect: ChangeDetectorRef,
        private _messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this._branchService.getClickEvent().subscribe((res) => {
            this.getListBranch();
        });
    }

    ngOnInit() {
        this.getListBranch();
        this.initForm();
    }
    initForm(): void {
        this.conditionForm = this._fb.group({
            orderBy: [],
            pageNumber: [],
            pageSize: [],
        });
    }

    getListBranch(): void {
        this.isLoadingTable = true;
        this._branchService.getListBranch().subscribe({
            next: (branch) => {
                setTimeout(() => {
                    this.branch = branch;
                    this.isLoadingTable = false;
                }, 1000);
            },
            error: (err) => {},
        });
    }

    filter(event: any): void {
        if (event && event.first) {
            this.firstPaging = event.first;
        }
        event.sortField &&
            FilterHelper.sortOrderByNoneMulti(
                this.conditionForm,
                event.sortField,
                event.sortOrder
            );
        event.rows &&
            FilterHelper.setPagingSize(this.conditionForm, event.rows);
        (event.first || event.first === 0) &&
            event.rows &&
            FilterHelper.setPageNumber(
                this.conditionForm,
                FilterHelper.getPageNumber(event.first, event.rows)
            );
        this.filterDataBranch();
    }

    filterDataBranch(): void {
        let param = FilterHelper.removeNullValue(this.conditionForm.value);
        this._branchService.filter(param).subscribe({
            next: (branch: any) => {
                this.branch = branch;
                this._detect.detectChanges();
            },
            error: (err) => {},
        });
    }
    openCreateModal(): void {
        this.modalCreateEditBranch.openModal(ModalMode.CREATE);
    }
    editProduct(item: any): void {
        this._branchService.getBranchById(item.id).subscribe({
            next: (branch) => {
                this.modalCreateEditBranch.openModal(ModalMode.EDIT, branch);
            },
            error: (err) => {},
        });
    }
    deleteProduct(item: any): void {
        this.deleteProductDialog = true;
        this.delectItem = item;
    }
    confirmDelete() {
        this._branchService.deleteBranch(this.delectItem.id).subscribe({
            next: () => {
                this._messageService.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Xóa Branch thành công',
                    life: 3000,
                });
                this.deleteProductDialog = false;
                this.delectItem = {};
                this.getListBranch();
            },
            error: () => {
                this._messageService.add({
                    severity: 'error',
                    summary: 'Thất bại',
                    detail: 'Xóa Branch không thành công',
                    life: 3000,
                });
                this.deleteProductDialog = false;
            },
        });
    }
}
