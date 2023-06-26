import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CrudBaseService } from 'src/app/core';
import { Branch } from '../models/branch';

@Injectable({
    providedIn: 'root',
})
export class BranchService extends CrudBaseService {
    private subject = new Subject<any>();
    constructor(private _httpClient: HttpClient) {
        super('branch', _httpClient);
    }
    sendClickEvent() {
        this.subject.next(event);
    }
    getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }
    getListBranch(): Observable<any[]> {
        return this._httpClient.get<any[]>(this.basePath);
    }

    getBranchById(id: string): Observable<Branch> {
        return this._httpClient.get<Branch>(this.basePath + '/' + id);
    }
    postBranch(branch: Branch): Observable<any> {
        return this._httpClient.post<Branch>(this.basePath, branch);
    }
    putBranch(branch: Branch): Observable<any> {
        return this._httpClient.put<Branch>(this.basePath, branch);
    }
    deleteBranch(id: string): Observable<Branch> {
        return this._httpClient.delete<Branch>(this.basePath + '/' + id);
    }
}
