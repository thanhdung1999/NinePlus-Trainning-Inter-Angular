import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientBookingComponent } from './client-booking.component';

const routes: Routes = [
    {
        path: '',
        component: ClientBookingComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientBookingRoutingModule {}
