import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // Importamos BehaviorSubject

@Injectable({
  providedIn: 'root'
})
export class SendMoviesService {

  private moviesSubject = new BehaviorSubject<string[]>([]); // Iniciamos con un arreglo vacío
  movies$ = this.moviesSubject.asObservable(); // Exponemos el observable para que otros componentes puedan suscribirse

  constructor() {}

  // Método para actualizar la lista de películas
  setMovies(movies: string[]): void {
    this.moviesSubject.next(movies); // Emitimos la nueva lista de películas
  }

  // Método para obtener la lista actual de películas
  getMovies(): string[] {
    return this.moviesSubject.value; // Devolvemos el valor actual (sin necesidad de suscribirse)
  }
}
