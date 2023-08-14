import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientBookingRoutingModule } from './client-booking-routing.module';
import { ClientBookingComponent } from './client-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { AppConfigModule } from 'src/app/layout/config/config.module';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    declarations: [ClientBookingComponent],
    imports: [
        CommonModule,
        ClientBookingRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        InputTextModule,
        RippleModule,
        AppConfigModule,
        TranslateModule,
        TooltipModule,
        CalendarModule,
        MultiSelectModule,
        InputTextareaModule,
        DropdownModule,
    ],
})
export class ClientBookingModule {}
