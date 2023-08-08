import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
    {
        path: 'list',
        data: { breadcrumb: 'Danh sách' },
        loadChildren: () => import('./customer-list/customer-list.module').then((m) => m.CustomerlistModule),
    },
    {
        path: 'edit',
        data: { breadcrumb: 'Cập nhật' },
        loadChildren: () => import('./customer-edit/customer-edit.module').then((m) => m.CustomerEditModule),
    },
    {
        path: 'create',
        data: { breadcrumb: 'Thêm mới' },
        loadChildren: () => import('./customer-create/customer-create.module').then((m) => m.CustomerCreateModule),
    },
    {
        path: 'detail',
        data: { breadcrumb: 'Chi tiết hồ sơ' },
        loadChildren: () => import('./customer-detail/customer-detail.module').then((m) => m.CustomerDetailModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerRoutingModule {}
