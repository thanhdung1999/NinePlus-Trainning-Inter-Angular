import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudBaseService } from 'src/app/core';
import { ApiResponse } from 'src/app/core/http/api-response';
import { FeedBack } from 'src/app/demo/api/feedback';

@Injectable({
    providedIn: 'root',
})
export class FeedbackService extends CrudBaseService {
    constructor(private _httpClient: HttpClient) {
        super('feedback', _httpClient);
    }

    getfeedbackById(id: string): Observable<ApiResponse> {
        return this.get(id);
    }
    getListFeedback() {
        return this.list();
    }
    deletefeedback(id: string): Observable<ApiResponse> {
        return this.delete(id, 'id');
    }
    postFeedbackMyBooking(feedback: FeedBack): Observable<ApiResponse> {
        return this._httpClient.post(`${this.basePath}/mybooking`, feedback);
    }
    getFeedbackWithIdBooking(idBooking: number) {
        return this._httpClient.get(`${this.basePath}/customer-booking/${idBooking}`);
    }
    updatefeedback(feedback: FeedBack): Observable<ApiResponse> {
        return this.updateByPut(feedback);
    }
}
