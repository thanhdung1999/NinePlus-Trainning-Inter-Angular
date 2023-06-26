import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class ApiBasePathPrefixInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (
            !request.url.startsWith('http') &&
            !request.url.startsWith('assets')
        ) {
            request = request.clone({
                url: `${request.url}`,
            });
        }

        return next.handle(request);
    }
}
