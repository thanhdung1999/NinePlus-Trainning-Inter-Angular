import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PasswordModule } from 'primeng/password';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        RippleModule,
        ButtonModule,
        InputTextModule,
        ToastModule,
        KeyFilterModule,
        PasswordModule,
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent],
})
export class LoginModule {}
