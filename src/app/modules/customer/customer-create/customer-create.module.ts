import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerCreateRoutingModule } from './customer-create-routing.module';
import { CustomerCreateComponent } from './customer-create.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from 'src/app/shared';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PasswordModule } from 'primeng/password';
@NgModule({
    declarations: [CustomerCreateComponent],
    imports: [
        CommonModule,
        CustomerCreateRoutingModule,
        CalendarModule,
        InputTextareaModule,
        SharedModule,
        InputNumberModule,
        FormsModule,
        InputMaskModule,
        TranslateModule,
        KeyFilterModule,
        PasswordModule,
    ],
})
export class CustomerCreateModule {}
