import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileCustomerComponent } from './profile-customer.component';

@NgModule({
  imports: [RouterModule.forChild([{
    path: '',
    component : ProfileCustomerComponent
  }])],
  exports: [RouterModule]
})
export class ProfileCustomerRoutingModule { }
