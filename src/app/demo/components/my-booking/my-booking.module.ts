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
import { MyBookingRoutingModule } from './my-booking-routing.module';
import { MyBookingComponent } from './my-booking.component';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FeedbackComponent } from './feedback/feedback.component';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ImageModule } from 'primeng/image';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
    declarations: [MyBookingComponent, FeedbackComponent, FeedbackListComponent ],
    imports: [
        CommonModule,
        MyBookingRoutingModule,
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
        RadioButtonModule,
        RatingModule,
        InputTextareaModule,
        ImageModule,
        ProgressBarModule
    ],
})
export class MyBookingModule {}
