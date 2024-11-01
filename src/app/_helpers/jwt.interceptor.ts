import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/enviroments/enviroment';
import { AccountService } from '../services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  // Inyecta el servicio AccountService para acceder al usuario actual y su token
  constructor(private accountService: AccountService) {}

  // Método que intercepta todas las solicitudes HTTP salientes
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Agrega el encabezado de autenticación con el token JWT si el usuario está autenticado
    // y la solicitud es hacia la URL de la API.

    const user = this.accountService.userValue; // Obtiene el usuario actual, que incluye el token JWT si está autenticado
    const isLoggedIn = user?.token; // Verifica si el usuario está autenticado comprobando si existe el token
    const isApiUrl = request.url.startsWith(environment.apiUrl); // Verifica si la URL de la solicitud comienza con la URL de la API configurada en el entorno

    // Si el usuario está autenticado y la solicitud es hacia la API, agrega el token al encabezado Authorization
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${user.token}` }, // Agrega el token en el encabezado como 'Bearer <token>'
      });
    }

    // Pasa la solicitud modificada (con el token en el encabezado) al siguiente manejador en la cadena de interceptores
    return next.handle(request);
  }
}
