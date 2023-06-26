import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonHelper } from 'src/app/core';
import { FilterHelper } from 'src/app/core/helpers/filter.helper';
import { MESSAGE_TITLE, MESSAGE_TRANS_COMMON, ModalMode } from 'src/app/shared';
import { Branch } from 'src/app/shared/models/branch';
import {
    Country,
    District,
    Province,
    Ward,
} from 'src/app/shared/models/location';
import { BranchService } from 'src/app/shared/services/branch.service';
import { LocationService } from 'src/app/shared/services/location.service';
import { TranslationService } from '../../i18n';
import { BranchListComponent } from '../branch-list/branch-list.component';

@Component({
    selector: 'app-branch-create-edit',
    templateUrl: './branch-create-edit.component.html',
    styleUrls: ['./branch-create-edit.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class BranchCreateEditComponent implements OnInit {
    @Input() branchDetail!: Branch;
    branchListComponent!: BranchListComponent;
    isOpenModal = false;
    submitted = false;
    branchForm!: FormGroup;
    countries: Country[] = [];
    provinces: Province[] = [];
    districts: District[] = [];
    wards: Ward[] = [];
    mode: string = '';
    modeEdit = ModalMode.EDIT;
    changelanguage!: string;
    constructor(
        private _branchService: BranchService,
        private _fb: FormBuilder,
        private _detect: ChangeDetectorRef,
        private _locationService: LocationService,
        private _messageService: MessageService,
        private confirmationService: ConfirmationService,
        private _translationService: TranslationService
    ) {
        this.changelanguage = this._translationService.getSelectedLanguage();
    }

    ngOnInit() {
        this.initForm();
    }
    async openModal(mode: string, data?: any) {
        this.mode = mode;
        this.getCountries();
        this.initForm();
        this._updateFormValue(data);
        return await (this.isOpenModal = true);
    }
    get controlBranchForm() {
        return this.branchForm.controls;
    }
    initForm(): void {
        this.branchForm = this._fb.group({
            id: [],
            title: ['', Validators.required],
            code: [''],
            isActive: false,
            countryId: ['', Validators.required],
            provinceId: ['', Validators.required],
            districtId: ['', Validators.required],
            wardId: ['', Validators.required],
        });
    }
    private _updateFormValue(data?: any): void {
        if (data) {
            this.getCities(data.countryId);
            this.getDistrict(data.provinceId);
            this.getWard(data.districtId);
            this.branchForm.patchValue({
                id: data.id,
                title: data.title,
                code: data.code,
                isActive: data.isActive,
                countryId: data.countryId,
                provinceId: data.provinceId,
                districtId: data.districtId,
                wardId: data.wardId,
            });
        }
    }
    getCountries(): void {
        this._locationService.getCountries().subscribe({
            next: (countries) => {
                this.countries = countries;
                this._detect.detectChanges();
            },
            error: (error) => {
                console.error(error);
            },
        });
    }
    getCities(id: number): void {
        this._locationService.getProvinces(id).subscribe({
            next: (provinces) => {
                this.provinces = provinces;
                this._detect.detectChanges();
            },
            error: (error) => {
                console.error(error);
            },
        });
    }
    getDistrict(id: number): void {
        this._locationService.getDistricts(id).subscribe({
            next: (districts) => {
                this.districts = districts;
                this._detect.detectChanges();
            },
            error: (error) => {
                console.error(error);
            },
        });
    }
    getWard(id: number): void {
        this._locationService.getWards(id).subscribe({
            next: (wards) => {
                this.wards = wards;
                this._detect.detectChanges();
            },
            error: (error) => {
                console.error(error);
            },
        });
    }
    hideDialog() {
        this.isOpenModal = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        if (this.branchForm.invalid) {
            return;
        }
        let branchInfo = FilterHelper.removeNullValue(this.branchForm.value);
        if (this.mode === ModalMode.CREATE) {
            this._branchService.postBranch(branchInfo).subscribe({
                next: (res) => {
                    const SAVE_SUCC = CommonHelper.getErrorMsg(
                        MESSAGE_TRANS_COMMON,
                        MESSAGE_TITLE.ADD_NEW_BRANCH_SUCC,
                        this._translationService.getSelectedLanguage()
                    );
                    const SAVE_ERR_TITLE = CommonHelper.getErrorMsg(
                        MESSAGE_TRANS_COMMON,
                        MESSAGE_TITLE.SUCCESS,
                        this._translationService.getSelectedLanguage()
                    );
                    this.isOpenModal = false;
                    this._messageService.add({
                        severity: 'success',
                        summary: SAVE_ERR_TITLE,
                        detail: SAVE_SUCC,
                        life: 3000,
                    });
                    this._branchService.sendClickEvent();
                    this._detect.detectChanges();
                },
                error: (error) => {
                    const SAVE_ERR = CommonHelper.getErrorMsg(
                        MESSAGE_TRANS_COMMON,
                        MESSAGE_TITLE.ADD_NEW_BRANCH_ERR,
                        this._translationService.getSelectedLanguage()
                    );
                    const SAVE_ERR_TITLE = CommonHelper.getErrorMsg(
                        MESSAGE_TRANS_COMMON,
                        MESSAGE_TITLE.ERROR,
                        this._translationService.getSelectedLanguage()
                    );
                    this._messageService.add({
                        severity: 'error',
                        summary: SAVE_ERR_TITLE,
                        detail: SAVE_ERR,
                        life: 3000,
                    });
                    this._detect.detectChanges();
                },
            });
        }
        if (this.mode === ModalMode.EDIT) {
            this._branchService.putBranch(branchInfo).subscribe({
                next: (res) => {
                    this.isOpenModal = false;
                    const SAVE_SUCC = CommonHelper.getErrorMsg(
                        MESSAGE_TRANS_COMMON,
                        MESSAGE_TITLE.EDIT_BRANCH_SUCC,
                        this._translationService.getSelectedLanguage()
                    );
                    const SAVE_ERR_TITLE = CommonHelper.getErrorMsg(
                        MESSAGE_TRANS_COMMON,
                        MESSAGE_TITLE.SUCCESS,
                        this._translationService.getSelectedLanguage()
                    );
                    this.isOpenModal = false;
                    this._messageService.add({
                        severity: 'success',
                        summary: SAVE_ERR_TITLE,
                        detail: SAVE_SUCC,
                        life: 3000,
                    });
                    this._branchService.sendClickEvent();
                    this._detect.detectChanges();
                },
                error: (error) => {
                    const SAVE_ERR = CommonHelper.getErrorMsg(
                        MESSAGE_TRANS_COMMON,
                        MESSAGE_TITLE.EDIT_BRANCH_ERR,
                        this._translationService.getSelectedLanguage()
                    );
                    const SAVE_ERR_TITLE = CommonHelper.getErrorMsg(
                        MESSAGE_TRANS_COMMON,
                        MESSAGE_TITLE.ERROR,
                        this._translationService.getSelectedLanguage()
                    );
                    this._messageService.add({
                        severity: 'error',
                        summary: SAVE_ERR_TITLE,
                        detail: SAVE_ERR,
                        life: 3000,
                    });
                    this._detect.detectChanges();
                },
            });
        }
    }
    selectCountry(e: any): void {
        this.getCities(e.value);
    }
    selectProvince(e: any): void {
        this.getDistrict(e.value);
    }
    selectDistrict(e: any): void {
        this.getWard(e.value);
    }
}
