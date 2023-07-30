import { Injectable } from '@angular/core';
import { CrudBaseService } from 'src/app/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { an } from '@fullcalendar/core/internal-common';
import { ApiResponse } from 'src/app/core/http/api-response';
@Injectable({
    providedIn: 'root',
})
export class WorkShiftService extends CrudBaseService {
    private _workShiftSubject: BehaviorSubject<any>;
    private subject = new Subject<any>();
    dataWorkShift$: Observable<any>;
    constructor(private _httpClient: HttpClient) {
        super('workshift', _httpClient);
        this._workShiftSubject = new BehaviorSubject<any>({});
        this.dataWorkShift$ = this._workShiftSubject.asObservable();
    }
    sendClickEnvent() {
        this.subject.next(event);
    }

    getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }

    getListWorkShift(): Observable<ApiResponse> {
        return this.list();
    }
}
