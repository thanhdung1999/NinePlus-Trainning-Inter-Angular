import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileLayoutComponent } from './profile-layout.component';
import { ProfileSidebarComponent } from './profile-sidebar.component';
import { ProfileHeaderComponent } from './profile-header.component';
import { BadgeModule } from 'primeng/badge';
import { TopbarProfileModule } from './topbar-profile/topbar-profile.module';

@NgModule({
    declarations: [ProfileLayoutComponent, ProfileSidebarComponent, ProfileHeaderComponent],
    imports: [CommonModule, RouterModule, BrowserModule, TopbarProfileModule, BadgeModule,],
    exports: [ProfileLayoutComponent],
})
export class ProfileLayoutModule {}
