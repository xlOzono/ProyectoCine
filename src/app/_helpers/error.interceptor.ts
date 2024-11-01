import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '../services/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                // Si el código de estado es 401 (no autorizado) o 403 (prohibido) y hay un usuario autenticado
                if ([401, 403].includes(err.status) && this.accountService.userValue) {
                    this.accountService.logout();
                }

                const error = err.error?.message || err.statusText;
                console.error(err);

                // Lanza un observable de error con el mensaje de error para que pueda ser manejado por el componente
                return throwError(() => error);
            })
        );
    }
}
