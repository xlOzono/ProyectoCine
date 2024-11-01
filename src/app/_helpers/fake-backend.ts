import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

// Arreglo en el almacenamiento local para los usuarios registrados
const usersKey = 'angular-tutorial-users';
let users: any[] = JSON.parse(localStorage.getItem(usersKey)!) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    // Interceptor para manejar las solicitudes HTTP
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // Llama a handleRoute() para interceptar rutas específicas
        return handleRoute();

        // Función que decide cómo manejar cada ruta interceptada
        function handleRoute() {
            switch (true) {
                // Ruta para autenticar usuarios (inicio de sesión)
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                
                // Ruta para registrar nuevos usuarios
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                
                // Pasa cualquier otra solicitud que no sea manejada aquí
                default:
                    return next.handle(request);
            }    
        }

        // Función para manejar la autenticación de usuarios
        function authenticate() {
            const { email, password } = body;
            // Busca al usuario en el arreglo local de usuarios
            const user = users.find(x => x.email === email && x.password === password);
            // Si el usuario no existe o la contraseña es incorrecta, devuelve un error
            if (!user) return error('El correo o contraseña son incorrectos');
            
            // Si el usuario existe, devuelve una respuesta simulada con un token
            return ok({
                ...basicDetails(user),
                token: 'fake-jwt-token' // Token JWT simulado
            });
        }

        // Función para registrar un nuevo usuario
        function register() {
            const user = body;

            // Verifica si el correo ya está registrado
            if (users.find(x => x.email === user.email)) {
                return error('El correo "' + user.email + '" ya está registrado');
            }

            // Asigna un ID al nuevo usuario y lo agrega al arreglo de usuarios
            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem(usersKey, JSON.stringify(users)); // Guarda el usuario en el almacenamiento local
            return ok();
        }

        // Funciones de ayuda

        // Función para devolver una respuesta HTTP con estado 200 y un cuerpo de respuesta
        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // Simula un retardo para imitar una llamada a la API
        }

        // Función para devolver un error con un mensaje específico
        function error(message: string) {
            return throwError(() => ({ error: { message } }))
                .pipe(materialize(), delay(500), dematerialize()); 
            // Usa materialize y dematerialize para asegurarse de que el retardo se aplique incluso si ocurre un error
        }

        // Función para devolver solo los detalles básicos del usuario
        function basicDetails(user: any) {
            const { id, email, firstName, lastName } = user;
            return { id, email, firstName, lastName };
        }
    }
}

// Proveedor para usar el interceptor FakeBackend en lugar del servicio HTTP
export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true // Permite que varios interceptores funcionen juntos
};
