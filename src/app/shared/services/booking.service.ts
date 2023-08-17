import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CrudBaseService, HttpHelper } from 'src/app/core';
import { ApiResponse } from 'src/app/core/http/api-response';
import { Booking } from 'src/app/demo/api/booking';
import { BookingCreate } from 'src/app/demo/api/booking-create';
import { BookingUpdate } from 'src/app/demo/api/booking-update';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class BookingService extends CrudBaseService {
    private _bookingSubject: BehaviorSubject<any>;
    private subject = new Subject<any>();
    dataBooking$: Observable<any>;

    constructor(private _httpClient: HttpClient) {
        super('booking', _httpClient);
        this._bookingSubject = new BehaviorSubject<any>({});
        this.dataBooking$ = this._bookingSubject.asObservable();
    }

    sendClickEvent() {
        this.subject.next(event);
    }

    getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }

    getHistoryBooking(id: string): Observable<ApiResponse> {
        return this._httpClient.get(`${this.basePath}/customer/${id}`);
    }

    getListBooking(): Observable<ApiResponse> {
        return this.list();
    }

    addBooking(booking: BookingCreate): Observable<ApiResponse> {
        return this.create(booking);
    }

    getBookingById(id: string): Observable<ApiResponse> {
        return this.get(id);
    }

    getListBookingWithIdCustomer(id: string): Observable<ApiResponse> {
        return this._httpClient.get(`${this.basePath}/customer?CustomerId=${id}`);
    }

    updateBooking(booking: BookingUpdate): Observable<ApiResponse> {
        return this._httpClient.put(`${this.basePath}`, booking);
    }

    deleteBooking(id: string): Observable<ApiResponse> {
        return this.delete(id, 'id');
    }
    filterBooking(body: any): Observable<any[]> {
        return this.filter(body);
    }
    updateBookingById(booking: BookingUpdate): Observable<BookingUpdate> {
        return this.updateByPut(booking);
    }

    updateStatusBooking(body: any) {
        return this._httpClient.patch(`${this.basePath}/update-status`, body);
    }
    filterMyBooking(filterParams: any, id: string): Observable<any[]> {
        return this.httpClient
            .get<any[]>(`${this.basePath}/customer?CustomerId=${id}`, {
                params: HttpHelper.objectToHttpParams({ ...filterParams }),
            })
            .pipe(map((res: any) => res));
    }
}
