import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { DefaultLayoutComponent } from './default-layout.component';
import { AppConfigModule } from 'src/app/layout/config/config.module';
import { LoginComponent } from '../../components/auth/login/login.component';
import { SharedModule } from 'src/app/shared';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TopbarProfileModule } from '../profile-layout/topbar-profile/topbar-profile.module';

@NgModule({
    declarations: [DefaultLayoutComponent, HeaderComponent, FooterComponent, LoginComponent],
    imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        AppConfigModule,
        SharedModule,
        FormsModule,
        TranslateModule,
        ScrollTopModule,
        TopbarProfileModule,
    ],
    exports: [DefaultLayoutComponent],
})
export class DefaultLayoutModule {}
