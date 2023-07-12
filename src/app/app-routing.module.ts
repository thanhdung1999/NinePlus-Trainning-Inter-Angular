import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () =>
                    import(
                        './demo/components/dashboards/dashboards.module'
                    ).then((m) => m.DashboardsModule),
            },
            {
                path: 'uikit',
                data: { breadcrumb: 'UI Kit' },
                loadChildren: () =>
                    import('./demo/components/uikit/uikit.module').then(
                        (m) => m.UIkitModule
                    ),
            },
            {
                path: 'utilities',
                data: { breadcrumb: 'Utilities' },
                loadChildren: () =>
                    import('./demo/components/utilities/utilities.module').then(
                        (m) => m.UtilitiesModule
                    ),
            },
            {
                path: 'pages',
                data: { breadcrumb: 'Pages' },
                loadChildren: () =>
                    import('./demo/components/pages/pages.module').then(
                        (m) => m.PagesModule
                    ),
            },
            {
                path: 'profile',
                data: { breadcrumb: 'User Management' },
                loadChildren: () =>
                    import('./demo/components/profile/profile.module').then(
                        (m) => m.ProfileModule
                    ),
            },
            {
                path: 'documentation',
                data: { breadcrumb: 'Documentation' },
                loadChildren: () =>
                    import(
                        './demo/components/documentation/documentation.module'
                    ).then((m) => m.DocumentationModule),
            },
            {
                path: 'blocks',
                data: { breadcrumb: 'Prime Blocks' },
                loadChildren: () =>
                    import(
                        './demo/components/primeblocks/primeblocks.module'
                    ).then((m) => m.PrimeBlocksModule),
            },
            {
                path: 'ecommerce',
                data: { breadcrumb: 'E-Commerce' },
                loadChildren: () =>
                    import('./demo/components/ecommerce/ecommerce.module').then(
                        (m) => m.EcommerceModule
                    ),
            },
            {
                path: 'apps',
                data: { breadcrumb: 'Apps' },
                loadChildren: () =>
                    import('./demo/components/apps/apps.module').then(
                        (m) => m.AppsModule
                    ),
            },
            {
                path: 'manage-system',
                data: { breadcrumb: 'Manage System' },
                loadChildren: () =>
                    import('./modules/manage-system/manage-system.module').then(
                        (m) => m.ManageSystemModule
                    ),
            },
            {
                path:'manage-employee',
                data:{breadcrumb: 'Danh sách nhân viên'},
                loadChildren: () => import('./modules/manage-system/components/employee/employee.module').then(
                    (m)=> m.EmployeeModule
                ),
            }
        ],
    },
    {
        path: 'auth',
        data: { breadcrumb: 'Auth' },
        loadChildren: () =>
            import('./demo/components/auth/auth.module').then(
                (m) => m.AuthModule
            ),
    },
    {
        path: 'landing',
        loadChildren: () =>
            import('./demo/components/landing/landing.module').then(
                (m) => m.LandingModule
            ),
    },
    {
        path: 'notfound',
        loadChildren: () =>
            import('./demo/components/notfound/notfound.module').then(
                (m) => m.NotfoundModule
            ),
    },
    { path: '**', redirectTo: '/notfound' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
