import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { StyleClassModule } from 'primeng/styleclass';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';

@NgModule({
    imports: [CommonModule, LandingRoutingModule, StyleClassModule, SharedModule, FormsModule],
    declarations: [LandingComponent],
})
export class LandingModule {}
