import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../_models/user';
import { Role } from '../_models/role';

// Arreglo en el almacenamiento local para los usuarios registrados
const usersKey = 'cine-app-users';
let users: any[] = JSON.parse(localStorage.getItem(usersKey)!) || [];

// Agregar un usuario admin predeterminado si no existe
if (!users.some(user => user.role === Role.Admin)) {
    const adminUser = new User(
        '1',
        'admin@example.com',
        'admin123',
        'Admin',
        'User',
        Role.Admin
    );

    users.push(adminUser);
    localStorage.setItem(usersKey, JSON.stringify(users));
}

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        // Función que decide cómo manejar cada ruta interceptada
        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                default:
                    return next.handle(request);
            }
        }

        // Función para manejar la autenticación de usuarios
        function authenticate() {
            const { email, password } = body;
            const user = users.find(x => x.email === email && x.password === password);
            if (!user) return error('El correo o contraseña son incorrectos');
            return ok({
                ...basicDetails(user),
                token: `fake-jwt-token.${user.id}` // Token JWT simulado
            });
        }

        // Función para registrar un nuevo usuario
        function register() {
            const { email, password, firstName, lastName, role } = body;

            if (users.find(x => x.email === email)) {
                return error('El correo "' + email + '" ya está registrado');
            }

            const id = users.length ? (Math.max(...users.map(x => parseInt(x.id!, 10))) + 1).toString() : '1';

            const newUser = new User(
                id,
                email,
                password,
                firstName,
                lastName,
                role || Role.User
            );

            users.push(newUser);
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok({ message: 'Usuario registrado exitosamente' });
        }

        // Funciones de ayuda

        function ok(body: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500));
        }

        function unauthorized() {
            return throwError(() => ({ status: 401, error: { message: 'Unauthorized' } }))
                .pipe(materialize(), delay(500), dematerialize());
        }

        function error(message: string) {
            return throwError(() => ({ status: 400, error: { message } }))
                .pipe(materialize(), delay(500), dematerialize());
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }

        function isAdmin() {
            const currentUser = getCurrentUser();
            return currentUser?.role === Role.Admin;
        }

        function getCurrentUser() {
            if (!isLoggedIn()) return null;
            const token = headers.get('Authorization')!.split('.')[1];
            const userId = parseInt(token);
            return users.find(x => x.id === userId);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function basicDetails(user: User) {
            const { id, email, firstName, lastName, role } = user;
            return { id, email, firstName, lastName, role };
        }
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
