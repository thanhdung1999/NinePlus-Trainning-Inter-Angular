import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkShiftListRoutingModule } from './work-shift-list-routing.module';
import { SharedModule } from 'src/app/shared';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { WorkShiftListComponent } from './work-shift-list.component';

@NgModule({
    declarations: [WorkShiftListComponent],
    imports: [CommonModule, WorkShiftListRoutingModule, SharedModule, SkeletonModule, TableModule]
})
export class WorkShiftListModule {}
