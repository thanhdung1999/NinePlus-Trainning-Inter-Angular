import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ApiBaseService } from '../http/crud.service';
import { UserAuthenticate } from 'src/app/shared';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticateService extends ApiBaseService {
    constructor(
        public override httpClient: HttpClient,
        private _sessionService: SessionService,
        private _router: Router,
    ) {
        super(httpClient);
    }

    login(employeeNo: string, password: string): Observable<any> {
        return this.httpClient
            .post(this.apiBasePath + 'identity/token', {
                employeeNo: employeeNo,
                password: password,
            })
            .pipe(
                tap((res: any) => {
                    const authInfor = res.data as UserAuthenticate;
                    this._sessionService.saveUserAuthenticate(authInfor);
                })
            );
    }
    sendMailForGot(body: any): Observable<any> {
        return this.httpClient.post(this.apiBasePath + 'account/forgot-password', body);
    }

    resestPasword(body: any): Observable<any> {
        return this.httpClient.post(this.apiBasePath + 'account/reset-password', body);
    }

    logOut(): void {
        this._sessionService.userAuthenticate && localStorage.removeItem('USER');
        this._router.navigateByUrl('/auth/login');
    }

    changePassword(body: any): Observable<any> {
        return this.httpClient.post(this.apiBasePath + 'account/change-password', body);
    }
}
