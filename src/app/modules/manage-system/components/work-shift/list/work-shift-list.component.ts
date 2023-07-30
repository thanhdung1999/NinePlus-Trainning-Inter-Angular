import { Component } from '@angular/core';
import { error } from 'console';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { WorkShiftService } from 'src/app/shared/services/work-shift.service';
@Component({
    selector: 'app-work-shift-list',
    templateUrl: './work-shift-list.component.html',
    styleUrls: ['./work-shift-list.component.scss'],
    providers: [MessageService],
})
export class WorkShiftListComponent {
    constructor(private _workShiftService: WorkShiftService) {}
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    getListWorkShift() {
        this._workShiftService.getListWorkShift().subscribe({
            next: (res) => {},
            error: (error) => {},
        });
    }
}
