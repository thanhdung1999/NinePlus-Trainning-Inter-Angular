import { Component } from '@angular/core';
import { error } from 'console';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Workshift } from 'src/app/demo/api/work-shift';
import { WorkShiftService } from 'src/app/shared/services/work-shift.service';
@Component({
    selector: 'app-work-shift-list',
    templateUrl: './work-shift-list.component.html',
    styleUrls: ['./work-shift-list.component.scss'],
    providers: [MessageService],
})
export class WorkShiftListComponent {
    workshifts: Workshift[] = [];
    isSkeleton: boolean = true;
    constructor(private _workShiftService: WorkShiftService) {}

    ngOnInit() {
        this.getListWorkShift();
        this.loadSkeletonTable();
    }

    getListWorkShift() {
        this._workShiftService.getListWorkShift().subscribe({
            next: (res) => {
                this.workshifts = res.data as Workshift[];
                console.log(this.workshifts);
            },
            error: (error) => {},
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    loadSkeletonTable() {
        setTimeout(() => {
            this.isSkeleton = false;
        }, 1000);
    }
}
