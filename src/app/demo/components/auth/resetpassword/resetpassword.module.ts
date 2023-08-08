import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordRoutingModule } from './resetpassword-routing.module';
import { AppConfigModule } from 'src/app/layout/config/config.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ResetPasswordComponent } from './resetpassword.component';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [ResetPasswordComponent],
    imports: [
        CommonModule,
        ResetPasswordRoutingModule,
        AppConfigModule,
        FormsModule,
        ToastModule,
        InputTextModule,
        RippleModule,
        ButtonModule,
        ReactiveFormsModule,
        TranslateModule,
    ],
})
export class ResetPasswordModule {}
