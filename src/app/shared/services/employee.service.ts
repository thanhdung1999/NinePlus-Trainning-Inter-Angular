import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { CrudBaseService } from 'src/app/core';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService extends CrudBaseService {
    private _employeeSubject: BehaviorSubject<any>;
    private subject = new Subject<any>();
    dataEmployee$: Observable<any>;
    constructor(private _httpClient: HttpClient) {
        super('employees', _httpClient);
        this._employeeSubject = new BehaviorSubject<any>({});
        this.dataEmployee$ = this._employeeSubject.asObservable();
    }
    sendClickEvent() {
        this.subject.next(event);
    }
    getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }
}
