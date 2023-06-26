import { AbstractControl } from '@angular/forms';

export class NotEqualsSameZeroValidator {
    /**
     * Check value month and year is not equal 0 is same time
     * @param control AbstractControl
     */
    static NotEqualZero(control: AbstractControl): void {
        const yearControl = control.get('year');
        const monthControl = control.get('month');

        if (!yearControl?.errors || !monthControl?.errors) {
            if (yearControl?.value === 0 && monthControl?.value === 0) {
                control.get('year')?.setErrors({ sameZeRo: true });
                control.get('month')?.setErrors({ sameZeRo: true });
            }

            if (yearControl?.value !== 0 && monthControl?.value === 0) {
                control.get('month')?.setErrors(null);
            }

            if (yearControl?.value === 0 && monthControl?.value !== 0) {
                control.get('year')?.setErrors(null);
            }
        }
    }
}
