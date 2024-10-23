// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface LoginResponse {
  token: string;
  role: 'ADMIN' | 'CLIENT';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.cinemamax.com'; // URL del servidor

  constructor(private http: HttpClient) {}

  // Método de login
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        // Guardamos el token y el rol del usuario en el almacenamiento local
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
      }),
      catchError(error => {
        console.error('Error en el login', error);
        return of({ token: '', role: '' }); // Retorna un objeto vacío si hay error
      })
    );
  }

  // Método para obtener el rol actual del usuario
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
