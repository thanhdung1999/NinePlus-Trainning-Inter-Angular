import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                data: { breadcrumb: 'Cổng thông tin' },
                loadChildren: () => import('./saas/saas.dashboard.module').then((m) => m.SaaSDashboardModule),
            },
        ]),
    ],
    exports: [RouterModule],
})
export class DashboardsRoutingModule {}
