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
            {
                path: 'detail/:id/:nameWorkshift',
                data: { breadcrumb: 'Detail' },
                loadChildren: () => import('./detail/workshift-detail.module').then((m) => m.WorkshiftDetailModule),
            },
            {
                path: 'edit/:id',
                data: { breadcrumb: 'Edit' },
                loadChildren: () => import('./edit/workshift-edit.module').then((m) => m.WorkshiftEditModule),
            },
            {
                path: 'create',
                data: { breadcrumb: 'Create' },
                loadChildren: () => import('./create/workshift-create.module').then((m) => m.WorkshiftCreateModule),
            },
        ]),
    ],
    exports: [RouterModule],
})
export class WorkShiftRoutingModule {}
