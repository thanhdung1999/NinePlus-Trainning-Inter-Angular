import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AppConfigModule } from 'src/app/layout/config/config.module';
import { RippleModule } from 'primeng/ripple';
import { TranslationModule } from 'src/app/modules/manage-system/components/i18n';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        InputTextModule,
        RippleModule,
        AppConfigModule,
        TranslationModule,
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
