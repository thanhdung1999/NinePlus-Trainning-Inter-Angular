import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'list',
                data: { breadcrumb: 'List' },
                loadChildren: () => import('./list/work-shift-list.module').then((m) => m.WorkShiftListModule),
            },
        ]),
    ],
    exports: [RouterModule],
})
export class WorkShiftRoutingModule {}
