import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudBaseService } from 'src/app/core';

@Injectable({
    providedIn: 'root',
})
export class LocationService extends CrudBaseService {
    constructor(private _httpClient: HttpClient) {
        super('', _httpClient);
    }
    getCountries(): Observable<any> {
        return this._httpClient.get<any>(this.apiBasePath + '/country');
    }

    getProvinces(id: number): Observable<any> {
        return this._httpClient.get<any>(`${this.apiBasePath}/province/${id}`);
    }

    getDistricts(id: number): Observable<any> {
        return this._httpClient.get<any>(`${this.apiBasePath}/district/${id}`);
    }

    getWards(id: number): Observable<any> {
        return this._httpClient.get<any>(`${this.apiBasePath}/ward/${id}`);
    }
}
