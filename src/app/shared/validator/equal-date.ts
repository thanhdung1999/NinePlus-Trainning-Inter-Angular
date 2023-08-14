import { FormGroup } from '@angular/forms';
import { Time } from '../constants/active-time-spa';
export class EqualsDateTime {
    static equalTime(fromTime: string, toTime: string) {
        return (formGroup: FormGroup) => {
            let start = formGroup.controls[fromTime];
            let end = formGroup.controls[toTime];
            const startTime: Time = formGroup.controls[fromTime].value as Time;
            const endTime: Time = formGroup.controls[toTime].value as Time;
            if (end.errors && !end.errors['toTimeValidator']) {
                return;
            }
            if (startTime.data && endTime.data) {
                if (startTime.data >= endTime.data) {
                    end.setErrors({ toTimeValidator: true });
                } else {
                    end.setErrors(null);
                }
            }
        };
    }
}
