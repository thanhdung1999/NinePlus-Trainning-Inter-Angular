import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileLayoutComponent } from './profile-layout.component';
import { ProfileSidebarComponent } from './profile-sidebar.component';
import { ProfileHeaderComponent } from './profile-header.component';
import { BadgeModule } from 'primeng/badge';
import { TopbarProfileModule } from './topbar-profile/topbar-profile.module';
import { AppConfigModule } from 'src/app/layout/config/config.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [ProfileLayoutComponent, ProfileSidebarComponent, ProfileHeaderComponent],
    imports: [CommonModule, RouterModule, BrowserModule, TopbarProfileModule, BadgeModule, TranslateModule],
})
export class ProfileLayoutModule {}
