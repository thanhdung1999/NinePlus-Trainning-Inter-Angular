import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceEditRoutingModule } from './service-edit-routing.module';
import { ServiceEditComponent } from './service-edit.component';
import { SharedModule } from 'src/app/shared';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
@NgModule({
  declarations: [ServiceEditComponent],
  imports: [
    CommonModule,
    ServiceEditRoutingModule,
    SharedModule,
    InputMaskModule,
    FormsModule,
    InputNumberModule
  ]
})
export class ServiceEditModule { }
