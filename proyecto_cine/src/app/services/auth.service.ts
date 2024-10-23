import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface LoginResponse {
  token: string;
  role: 'ADMIN' | 'CLIENT';  // Tipo exacto 'ADMIN' o 'CLIENT'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.cinemamax.com';  // URL de la API

  constructor(private http: HttpClient) {}

  // Método de login
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        // Guardamos el token y el rol del usuario en el almacenamiento local
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);  // Siempre será 'ADMIN' o 'CLIENT'
      }),
      catchError(error => {
        console.error('Error en el login', error);
        
        // Devolvemos un observable vacío con valores por defecto (pero compatibles con LoginResponse)
        const fallbackResponse: LoginResponse = { token: '', role: 'CLIENT' };
        return of(fallbackResponse);   // Usamos un valor válido para 'role'
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
