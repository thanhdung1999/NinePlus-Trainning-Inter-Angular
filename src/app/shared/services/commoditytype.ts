import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CrudBaseService } from 'src/app/core';
import { CommodityType } from '../models/commoditytype';
@Injectable({
    providedIn: 'root',
})
export class BranchService extends CrudBaseService {
    private subject = new Subject<any>();
    constructor(private _httpClient: HttpClient) {
        super('commoditytypes', _httpClient);
    }
    sendClickEvent() {
        this.subject.next(event);
    }
    getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }
    getListCommoditytypes(): Observable<any[]> {
        return this._httpClient.get<any[]>(this.basePath);
    }
    postCommoditytypes(commodityType: CommodityType): Observable<any> {
        return this._httpClient.post<CommodityType>(this.basePath, commodityType);
    }
    deleteCommoditytypes(id: string): Observable<CommodityType> {
        return this._httpClient.delete<CommodityType>(this.basePath + '/' + id);
    }
    putCommoditytypes(commodityType: CommodityType): Observable<any> {
        return this._httpClient.put<CommodityType>(this.basePath, commodityType);
    }
    getCommoditytypesById(id: string): Observable<CommodityType> {
        return this._httpClient.get<CommodityType>(this.basePath + '/' + id);
    }
}
