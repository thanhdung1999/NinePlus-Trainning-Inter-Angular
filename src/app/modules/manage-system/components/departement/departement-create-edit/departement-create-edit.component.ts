import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonHelper } from 'src/app/core';
import { MESSAGE_TITLE, MESSAGE_TRANS_COMMON, ModalMode } from 'src/app/shared';
import { Branch } from 'src/app/shared/models/branch';
import { Departement } from 'src/app/shared/models/departement';
import { BranchService } from 'src/app/shared/services/branch.service';
import { DepartementService } from 'src/app/shared/services/departement.service';
import { TranslationService } from '../../i18n';

@Component({
  selector: 'app-departement-create-edit',
  templateUrl: './departement-create-edit.component.html',
  styleUrls: ['./departement-create-edit.component.scss']
})
export class DepartementCreateEditComponent {
  @Input() departmentDetail: Departement[] = [];
  isOpenModal = false;
  submitted = false;
  departmentForm!: FormGroup;
  listBranch: Branch[] = [];
  mode: string = '';
  modeEdit = ModalMode.EDIT;
  hasError!: boolean;
  changelanguage!: string;
  constructor(
    private _fb: FormBuilder,
    private _detect: ChangeDetectorRef,
    private _messageService: MessageService,
    private _translationService: TranslationService,
    private _branchService: BranchService,
    private _departementService: DepartementService,
) {
    this.changelanguage = this._translationService.getSelectedLanguage();
}

  ngOnInit() {
    this.getBranches();
    this.initForm();
  }
  get controlDepartmentForm() {
    return this.departmentForm.controls;
}
  initForm(): void {
    this.departmentForm = this._fb.group({
      code: [''],
      title: ['', Validators.required],
      branchId: ['',Validators.required],
      isActive: false,
    });
  }
  async openModal(mode: string, data?: any) {
      this.mode = mode;
      this.initForm();
      this._updateFormValue(data);
      return await (this.isOpenModal = true);
  }
  hideDialog() {
    this.isOpenModal = false;
    this.submitted = false;
  }
  getBranches(): void {
    this._branchService.getListBranch().subscribe({
        next: (res) => {
            console.log(res)
           this.listBranch = res
        },
        error: (error) => {},
    });
  }
  onSubmit(){
    if (this.mode === ModalMode.CREATE) {
      this.hasError = false;
      this.submitted = true;
      if (this.departmentForm.invalid) {
          return;
      }
      this._departementService.create(this.departmentForm.value).subscribe({
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
            this._departementService.sendClickEvent();
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
  }
  private _updateFormValue(data?: any): void {
    if (data) {
        this.departmentForm.patchValue({
            id: data.id,
            title: data.title,
            code: data.code,
            isActive: data.isActive,
            branchId:data.branchId
        });
    }
}
}
