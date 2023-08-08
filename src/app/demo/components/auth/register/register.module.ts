import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { AppConfigModule } from 'src/app/layout/config/config.module';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
    imports: [
        CommonModule,
        RegisterRoutingModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        AppConfigModule,
        CalendarModule,
        InputTextareaModule,
        ReactiveFormsModule,
        FormsModule,
        ToastModule,
        InputMaskModule,
        TranslateModule,
    ],
    declarations: [RegisterComponent],
})
export class RegisterModule {}
