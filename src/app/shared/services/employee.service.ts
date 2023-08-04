import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { CrudBaseService } from 'src/app/core';
import { Employee, EmployeeUpdate, EmployeeCreate } from 'src/app/demo/api/employee';
import { ApiResponse } from 'src/app/core/http/api-response';
@Injectable({
    providedIn: 'root',
})
export class EmployeeService extends CrudBaseService {
    private _employeeSubject: BehaviorSubject<any>;
    private subject = new Subject<any>();
    dataEmployee$: Observable<any>;
    constructor(private _httpClient: HttpClient) {
        super('employee', _httpClient);
        this._employeeSubject = new BehaviorSubject<any>({});
        this.dataEmployee$ = this._employeeSubject.asObservable();
    }
    sendClickEvent() {
        this.subject.next(event);
    }
    getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }

    getListEmployee(): Observable<any> {
        return this.list();
    }

    getEmployeeById(id: string): Observable<any> {
        return this.get(id);
    }

    deleteEmployeeById(id: string): Observable<Employee> {
        return this.delete(id, 'id');
    }

    updateEmployeeById(employee: EmployeeUpdate): Observable<EmployeeUpdate> {
        return this.updateByPut(employee);
    }

    createEmployee(employee: EmployeeCreate): Observable<EmployeeCreate> {
        return this.create(employee);
    }

    resetPasswordEmployee(body: any): Observable<any> {
        const url = `${this.basePath}/${body}/reset-password`;
        return this.httpClient.patch(url, {});
    }

    getListDetailWorkshift(idWorkshift: number, key: string): Observable<ApiResponse> {
        return this._httpClient.get(`${this.basePath}?${key}=${idWorkshift}`);
    }

    changeWorkshiftByIdEmployee(body: any): Observable<any> {
        return this.httpClient.patch(`${this.basePath}/change-workshift`, body);
    }

    filterEmployee(body: any): Observable<any[]> {
        return this.filter(body);
    }
}
