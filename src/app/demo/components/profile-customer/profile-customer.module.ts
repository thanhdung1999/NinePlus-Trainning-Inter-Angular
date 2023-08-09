import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { AppConfigModule } from 'src/app/layout/config/config.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { ProfileCustomerRoutingModule } from './profile-customer-routing.module';
import { ProfileCustomerComponent } from './profile-customer.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [ProfileCustomerComponent],
    imports: [
        CommonModule,
        ProfileCustomerRoutingModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        ToastModule,
        DividerModule,
        FormsModule,
        ReactiveFormsModule,
        AppConfigModule,
        CalendarModule,
        InputTextareaModule,
        InputMaskModule,
        TranslateModule
    ],
})
export class ProfileCustomerModule {}
