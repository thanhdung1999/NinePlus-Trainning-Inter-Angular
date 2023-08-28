import { FormGroup } from '@angular/forms';
import { isEmpty, isNil } from 'lodash';
export class MatchPassword {
    static confirmedValidator(password: string, confirmPassword: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[password];
            const matchingControl = formGroup.controls[confirmPassword];
            if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }
    static newPasswordValidator(password: string, newPassword: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[password];
            const matchingControl = formGroup.controls[newPassword];
            if (matchingControl.errors && !matchingControl.errors['newPasswordValidator']) {
                return;
            }
            if (control.value === matchingControl.value) {
                matchingControl.setErrors({ newPasswordValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }
    static UsernamePasswordValidator(username: string, password: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[username];
            const matchingControl = formGroup.controls[password];
            const value = {
                username: String(control.value).toLocaleLowerCase(),
                passowrd: String(matchingControl.value).toLocaleLowerCase(),
            };
            const startUsername = value.username.slice(0, 6);
            if ((isEmpty(value.username) && isEmpty(value.passowrd)) || (isNil(value.username) && isNil(value.passowrd))) {
                return;
            }
            if (matchingControl.errors && !matchingControl.errors['password']) {
                return;
            }
            if (value.username === value.passowrd || value.passowrd.startsWith(startUsername)) {
                matchingControl.setErrors({ passwordUsernameMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }
}
