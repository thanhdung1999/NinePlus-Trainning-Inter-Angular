import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonHelper } from 'src/app/core';
import { MESSAGE_TITLE, MESSAGE_TRANS_COMMON, ModalMode } from 'src/app/shared';
import { Departement } from 'src/app/shared/models/departement';
import { DepartementService } from 'src/app/shared/services/departement.service';
import { TranslationService } from '../../i18n';
import { DepartementCreateEditComponent } from '../departement-create-edit/departement-create-edit.component';

@Component({
    selector: 'app-departement-list',
    templateUrl: './departement-list.component.html',
    styleUrls: ['./departement-list.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class DepartementListComponent {
    @ViewChild('modalCreateEditDepartment')
    modalCreateEditDepartment!: DepartementCreateEditComponent;
    listDepartement: Departement[] = [];
    totalRecords: number = 0;
    firstPaging = 0;
    departmentDetail: Departement[] = [];
    departementForm!: FormGroup;
    isOpenModalCreateEdit = false;
    deleteProductDialog = false;
    delectItem!: any;
    isLoadingTable = false;
    constructor(
        private _departementService: DepartementService,
        private _fb: FormBuilder,
        private _messageService: MessageService,
        private _translationService: TranslationService
    ) {
        this._departementService.getClickEvent().subscribe((res) => {
            this.getListDepartement();
        });
    }
    ngOnInit() {
        this.getListDepartement();
        this.initForm();
    }
    initForm(): void {
        this.departementForm = this._fb.group({
            orderBy: [],
            pageNumber: [],
            pageSize: [],
        });
    }
    getListDepartement(): void {
        this.isLoadingTable = true;
        this._departementService.getListDepartement().subscribe({
            next: (res) => {
                setTimeout(() => {
                    this.listDepartement = res;
                    this.isLoadingTable = false;
                }, 1000);
            },
            error: (error) => {},
        });
    }
    openCreateModal(): void {
        this.modalCreateEditDepartment.openModal(ModalMode.CREATE);
    }
    deleteDepartment(item: any) {
        this.deleteProductDialog = true;
        this.delectItem = item;
    }
    confirmDelete() {
        this._departementService
            .deleteDepartment(this.delectItem.id)
            .subscribe({
                next: () => {
                    const DELETE_SUCC = CommonHelper.getErrorMsg(
                        MESSAGE_TRANS_COMMON,
                        MESSAGE_TITLE.DELETE_SUCC,
                        this._translationService.getSelectedLanguage()
                    );
                    const DELETE_ERR_TITLE = CommonHelper.getErrorMsg(
                        MESSAGE_TRANS_COMMON,
                        MESSAGE_TITLE.SUCCESS,
                        this._translationService.getSelectedLanguage()
                    );
                    this._messageService.add({
                        severity: 'success',
                        summary: DELETE_ERR_TITLE,
                        detail: DELETE_SUCC,
                        life: 3000,
                    });
                    this.deleteProductDialog = false;
                    this.delectItem = {};
                    this.getListDepartement();
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
    editDepartment(item: any) {
        this._departementService.getDepartmentById(item.id).subscribe({
            next: (res) => {
                this.modalCreateEditDepartment.openModal(ModalMode.EDIT, res);
            },
            error: (err) => {},
        });
    }
}
