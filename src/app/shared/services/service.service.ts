import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CrudBaseService } from 'src/app/core';
import { ApiResponse } from 'src/app/core/http/api-response';

@Injectable({
    providedIn: 'root',
})
export class ServicesService extends CrudBaseService {
    private subject = new Subject<any>();
    constructor(private _httpClient: HttpClient) {
        super('service', _httpClient);

    }
    sendClickEvent() {
        this.subject.next(event);
    }

    getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }
    getListServices(): Observable<ApiResponse> {
        return this.list();
    }
}
