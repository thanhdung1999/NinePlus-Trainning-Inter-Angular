import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from 'src/app/shared';
import { CustomerEditComponent } from './customer-edit.component';
import { CustomerEditRoutingModule } from './customer-edit-routing.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { TranslateModule } from '@ngx-translate/core';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PasswordModule } from 'primeng/password';
@NgModule({
    declarations: [CustomerEditComponent],
    imports: [
        CommonModule,
        CustomerEditRoutingModule,
        CalendarModule,
        InputTextareaModule,
        SharedModule,
        InputNumberModule,
        InputMaskModule,
        TranslateModule,
        KeyFilterModule,
        PasswordModule,
    ],
})
export class CustomerEditModule {}
