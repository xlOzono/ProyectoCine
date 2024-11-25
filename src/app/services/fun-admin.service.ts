import { Injectable } from '@angular/core';
import { Funcion } from '../_models/funcion';
import { showTimeFuncion } from '../_models/showTimeFuncion';

@Injectable({
  providedIn: 'root',
})
export class FunAdminService {
  constructor() {}

  protected movieFunciones: Funcion[] = [];

  addFuncion(
    showID: number,
    opcionIdioma: string,
    formato: string,
    precio: number,
    showDay: Date,
    showTimes: string[],
    movieName: string,
    showSeats: showTimeFuncion[]
  ): void {
    this.movieFunciones.push({
      showID,
      opcionIdioma,
      formato,
      precio,
      showDay,
      showTimes,
      movieName,
      showSeats,
    });
  }

  getMovieFunciones(movieName: string): Funcion[] {
    return this.movieFunciones.filter(
      (funcion) => funcion.movieName.toLowerCase() === movieName.toLowerCase()
    );
  }

  funcionesLength(): number {
    return this.movieFunciones.length;
  }

  movieExists(movieName: string): boolean {
    return this.movieFunciones.some(
      (funcion) => funcion.movieName.toLowerCase() === movieName.toLowerCase()
    );
  }

  updateFuncion(
    showID: number,
    updatedAttributes: Partial<Omit<Funcion, 'showID'>>
  ): boolean {
    const index = this.movieFunciones.findIndex(
      (funcion) => funcion.showID === showID
    );

    if (index === -1) {
      return false; // Función no encontrada
    }

    // Actualizar los atributos de la función
    this.movieFunciones[index] = {
      ...this.movieFunciones[index],
      ...updatedAttributes,
      showSeats:
        updatedAttributes.showSeats || this.movieFunciones[index].showSeats, // Asegurar que showSeats siempre esté presente
    };

    return true;
  }

  getFuncionByCriteria(
    showDay: Date,
    opcionIdioma: string,
    formato: string,
    movieName: string
  ): Funcion | undefined {
    return this.movieFunciones.find((funcion) => {
      const isSameDate =
        funcion.showDay.getFullYear() === showDay.getFullYear() &&
        funcion.showDay.getMonth() === showDay.getMonth() &&
        funcion.showDay.getDate() === showDay.getDate();

      const isSameIdioma =
        funcion.opcionIdioma.toLowerCase() === opcionIdioma.toLowerCase();
      const isSameFormato =
        funcion.formato.toLowerCase() === formato.toLowerCase();
      const isSameMovieName =
        funcion.movieName.toLowerCase() === movieName.toLowerCase();

      return isSameDate && isSameIdioma && isSameFormato && isSameMovieName;
    });
  }

  updateFunciones(movieName: string, newFunciones: Funcion[]): void {
    // Filtrar funciones que no pertenecen a esta película
    this.movieFunciones = this.movieFunciones.filter(
      (funcion) => funcion.movieName.toLowerCase() !== movieName.toLowerCase()
    );

    // Agregar las nuevas funciones, asegurando que cada una tenga `showSeats`
    for (const newFuncion of newFunciones) {
      this.movieFunciones.push({
        ...newFuncion,
        showSeats: newFuncion.showSeats, // Asegurar que siempre exista
      });
    }
  }
  
  private isSameFuncion(func1: Funcion, func2: Funcion): boolean {
    return (
      func1.showDay.toDateString() === func2.showDay.toDateString() &&
      func1.opcionIdioma.toLowerCase() === func2.opcionIdioma.toLowerCase() &&
      func1.formato.toLowerCase() === func2.formato.toLowerCase() &&
      func1.movieName.toLowerCase() === func2.movieName.toLowerCase() &&
      JSON.stringify(func1.showTimes) === JSON.stringify(func2.showTimes)
    );
  }
}
