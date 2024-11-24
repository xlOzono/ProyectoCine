import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/enviroments/enviroment';
import { User } from 'src/app/_models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private router: Router, private http: HttpClient) {
    const storedUser = JSON.parse(localStorage.getItem('user')!);
    this.userSubject = new BehaviorSubject(
      storedUser ? Object.assign(new User(), storedUser) : null
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  // Método para actualizar el usuario en memoria y almacenamiento local
  public updateUser(user: User): void {
    this.userSubject.next(user); // Actualiza el BehaviorSubject
    localStorage.setItem('user', JSON.stringify(user)); // Sincroniza con el almacenamiento local
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/users/authenticate`, { email, password })
      .pipe(
        map((user) => {
          const userInstance = Object.assign(new User(), user);
  
          // Recuperar compras guardadas anteriormente
          const lastPurchases = localStorage.getItem('lastPurchases');
          if (lastPurchases) {
            userInstance.listBuys = JSON.parse(lastPurchases);
            localStorage.removeItem('lastPurchases'); // Limpiar después de recuperar
          }
  
          this.userSubject.next(userInstance);
          localStorage.setItem('user', JSON.stringify(userInstance)); // Guardar el usuario actualizado
          return userInstance;
        })
      );
  }
  

  logout() {
    const user = this.userValue;
    if (user && user.listBuys) {
      localStorage.setItem('lastPurchases', JSON.stringify(user.listBuys)); // Guardar las compras en localStorage
    }
  
    localStorage.removeItem('user'); // Eliminar el usuario
    this.userSubject.next(null); // Restablecer el BehaviorSubject
    this.router.navigate(['/account/login']); // Redirigir al login
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }
}
