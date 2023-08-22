import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { ChangePasswordComponent } from './changepassword.component';
import { AppConfigModule } from 'src/app/layout/config/config.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PasswordModule } from 'primeng/password';
import { ChangePasswordRoutingModule } from './changepassword-routing.module';

@NgModule({
    declarations: [ChangePasswordComponent],
    imports: [
        CommonModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        ToastModule,
        DividerModule,
        FormsModule,
        ReactiveFormsModule,
        ChangePasswordRoutingModule,
        AppConfigModule,
        TranslateModule,
        KeyFilterModule,
        PasswordModule,
    ],
})
export class ChangePasswordModule {}
