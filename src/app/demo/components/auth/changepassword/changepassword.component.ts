import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { MessageService } from 'primeng/api';
import { AuthenticateService } from 'src/app/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MESSAGE_ERROR_INPUT, MatchPassword, REGIX, ROUTER, TOAST } from 'src/app/shared';
import { ToastService } from 'src/app/shared/services/toast.service';

class ChangePassword {
    password?: string;
    newPassword?: string;
    confirmNewPassword?: string;
}

@Component({
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.scss'],
    providers: [ToastService, MessageService],
})
export class ChangePasswordComponent {
    submitted: boolean = false;

    isSuccessChangePassword = false;

    formChangePassword!: FormGroup;

    keyToast = TOAST.KEY_BC;

    isLoading = false;

    rgPassword : RegExp = REGIX.password

    constructor(
        private _layoutService: LayoutService,
        private _router: Router,
        private _fb: FormBuilder,
        private _authenticateService: AuthenticateService,
        private _toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.initFormChangePassword();
    }

    initFormChangePassword() {
        this.formChangePassword = this._fb.group(
            {
                password: ['', [Validators.required, Validators.minLength(8)]],
                newPassword: ['', [Validators.required, Validators.minLength(8)]],
                confirmNewPassword: ['', [Validators.required, Validators.minLength(8)]],
            },
            {
                validator: [
                    MatchPassword.newPasswordValidator('password', 'newPassword'),
                    MatchPassword.confirmedValidator('newPassword', 'confirmNewPassword'),
                ],
            }
        );
    }

    changePassword() {
        this.submitted = true;      
        this.isLoading = true;
        const changePassword: ChangePassword = cloneDeep(this.formChangePassword.value) as ChangePassword;
        if (this.formChangePassword.valid) {
            if (this.formChangePassword.value.password !== this.formChangePassword.value.newPassword) {
                this._authenticateService.changePassword(changePassword).subscribe({
                    next: (res) => {
                        // Show success change password
                        this.isLoading = false;
                        this.isSuccessChangePassword = true;
                    },
                    error: (err) => {
                        setTimeout(() => {
                            this.isLoading = false;
                        }, 1000);
                        if (err.error?.messages?.length > 0) {
                            err.error.messages?.forEach((ms: string) => {
                                this._toastService.showError(ms, this.keyToast);
                            });
                        }
                    },
                });
            } else {
                this._toastService.showError(MESSAGE_ERROR_INPUT.MATCH_CHANGE_PASSWORD, this.keyToast);
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            }
        } else {
            this._toastService.showError(MESSAGE_ERROR_INPUT.VALID, this.keyToast);
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        }
    }

    navigateToLanding() {
        this._router.navigate([ROUTER.LANDING]);
    }

    get filledInput(): boolean {
        return this._layoutService.config.inputStyle === 'filled';
    }

    get f() {
        return this.formChangePassword.controls;
    }
}
