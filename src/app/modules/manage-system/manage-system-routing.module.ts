import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchListComponent } from './components/branch/branch-list/branch-list.component';
import { CommotityesListComponent } from './components/commotityes/commotityes-list/commotityes-list.component';
import { DepartementListComponent } from './components/departement/departement-list/departement-list.component';
import { LocationListComponent } from './components/location/location-list/location-list.component';
import { ManageSystemComponent } from './manage-system.component';

const routes: Routes = [
    {
        path: '',
        component: ManageSystemComponent,
        children: [
            {
                path: 'list-branch',
                data: { breadcrumb: 'Branch' },
                component: BranchListComponent,
            },
            {
                path: 'list-departement',
                data: { breadcrumb: 'Departement' },
                component: DepartementListComponent,
            },
            {
                path: 'list-location',
                data: { breadcrumb: 'Location' },
                component: LocationListComponent,
            },
            {
                path: 'commotityes-location',
                data: { breadcrumb: 'Commotityes' },
                component: CommotityesListComponent,
            },
            { path: '', redirectTo: 'list-branch', pathMatch: 'full' },
            { path: '**', redirectTo: '/notfound' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManageSystemRoutingModule {}
