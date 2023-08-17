import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditMyBookingComponent } from './edit-my-booking.component';

const routes: Routes = [
    {
        path: ':id',
        component: EditMyBookingComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EditMyBookingRoutingModule {}
