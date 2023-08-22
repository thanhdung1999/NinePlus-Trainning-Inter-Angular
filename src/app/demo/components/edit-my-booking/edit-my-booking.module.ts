import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { EditMyBookingRoutingModule } from './edit-my-booking-routing.module';
import { EditMyBookingComponent } from './edit-my-booking.component';

@NgModule({
    declarations: [EditMyBookingComponent],
    imports: [
        CommonModule,
        EditMyBookingRoutingModule,
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
        DividerModule,
        ConfirmDialogModule,
        AppConfigModule,
        DialogModule,
        MultiSelectModule,
    ],
})
export class EditMyBookingModule {}
