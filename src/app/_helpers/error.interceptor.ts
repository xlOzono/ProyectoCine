import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '../services/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
        // Inyectamos AccountService para poder acceder al estado de autenticación del usuario y manejar el logout
    constructor(private accountService: AccountService) { }

    // Intercepta todas las solicitudes HTTP
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Pasa la solicitud al siguiente manejador y captura cualquier error en la respuesta
        return next.handle(request).pipe(catchError(err => {
            // Si el código de estado es 401 (no autorizado) o 403 (prohibido) y hay un usuario autenticado            
            if ([401, 403].includes(err.status) && this.accountService.userValue) {
            // Llama al método de logout de AccountService para cerrar la sesión
                this.accountService.logout();
            }
            // Extrae el mensaje de error de la respuesta, si está disponible
            const error = err.error?.message || err.statusText;
                
            // Muestra el error en la consola
            console.error(err);

            // Lanza un observable de error con el mensaje de error para que pueda ser manejado por el componente
            return throwError(() => error);
        }))
    }
}