import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Horario {
  id: number;
  peliculaId: number;
  sala: string;
  fecha: string;  // Fecha y hora de la función
}

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private apiUrl = 'https://api.cinemamax.com/horarios';  // URL de la API

  constructor(private http: HttpClient) {}

  // Obtener todos los horarios
  getHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.apiUrl);
  }

  // Obtener horarios por película
  getHorariosPorPelicula(peliculaId: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.apiUrl}?peliculaId=${peliculaId}`);
  }

  // Crear un nuevo horario
  crearHorario(horario: Horario): Observable<Horario> {
    return this.http.post<Horario>(this.apiUrl, horario);
  }

  // Actualizar un horario existente
  actualizarHorario(id: number, horario: Horario): Observable<Horario> {
    return this.http.put<Horario>(`${this.apiUrl}/${id}`, horario);
  }

  // Eliminar un horario
  eliminarHorario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
