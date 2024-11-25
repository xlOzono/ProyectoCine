import { Injectable } from '@angular/core';
import { Funcion } from '../_models/funcion';
import { showTimeFuncion } from '../_models/showTimeFuncion';
import { Seat } from '../_models/seat';

@Injectable({
  providedIn: 'root',
})
export class FunAdminService {
  constructor() {}

  protected movieFunciones: Funcion[] = [
    // Inception functions
    {
      showID: 1,
      opcionIdioma: 'subtitulada',
      formato: '2D',
      precio: 5000,
      showDay: new Date('2024-12-01'),
      showTimes: ['18:00 | Sala 1', '21:00 | Sala 2'],
      movieName: 'Inception',
      showSeats: this.createShowTimeFunciones(
        ['18:00 | Sala 1', '21:00 | Sala 2'],
        10,
        10
      ), // Inicializar asientos
    },
    {
      showID: 2,
      opcionIdioma: 'subtitulada',
      formato: '3D',
      precio: 6000,
      showDay: new Date('2024-12-02'),
      showTimes: ['16:00 | Sala 3', '19:00 | Sala 4'],
      movieName: 'Inception',
      showSeats: this.createShowTimeFunciones(
        ['16:00 | Sala 3', '19:00 | Sala 4'],
        10,
        10
      ), // Inicializar asientos
    },
    {
      showID: 3,
      opcionIdioma: 'doblada',
      formato: '4D',
      precio: 8000,
      showDay: new Date('2024-12-03'),
      showTimes: ['14:00 | Sala 5', '17:00 | Sala 6'],
      movieName: 'Inception',
      showSeats: this.createShowTimeFunciones(
        ['14:00 | Sala 5', '17:00 | Sala 6'],
        10,
        10
      ), // Inicializar asientos
    },

    // The Shawshank Redemption functions
    {
      showID: 4,
      opcionIdioma: 'doblada',
      formato: '2D',
      precio: 4000,
      showDay: new Date('2024-12-02'),
      showTimes: ['17:00 | Sala 3', '20:00 | Sala 4'],
      movieName: 'The Shawshank Redemption',
      showSeats: this.createShowTimeFunciones(
        ['17:00 | Sala 3', '20:00 | Sala 4'],
        10,
        10
      ), // Inicializar asientos
    },
    {
      showID: 5,
      opcionIdioma: 'subtitulada',
      formato: '3D',
      precio: 5000,
      showDay: new Date('2024-12-04'),
      showTimes: ['15:00 | Sala 1', '18:00 | Sala 2'],
      movieName: 'The Shawshank Redemption',
      showSeats: this.createShowTimeFunciones(
        ['15:00 | Sala 1', '18:00 | Sala 2'],
        10,
        10
      ), // Inicializar asientos
    },
    {
      showID: 6,
      opcionIdioma: 'doblada',
      formato: '4D',
      precio: 7000,
      showDay: new Date('2024-12-05'),
      showTimes: ['13:00 | Sala 5', '16:00 | Sala 7'],
      movieName: 'The Shawshank Redemption',
      showSeats: this.createShowTimeFunciones(
        ['13:00 | Sala 5', '16:00 | Sala 7'],
        10,
        10
      ), // Inicializar asientos
    },
  ];

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

  createShowTimeFunciones(
    showTimes: string[],
    rows: number,
    columns: number
  ): showTimeFuncion[] {
    return showTimes.map((showTime, index) => ({
      showID: index + 1, // Generar un ID único para cada horario
      matrixseats: this.initializeShowSeats(rows, columns), // Inicializar la matriz de asientos
    }));
  }

  initializeShowSeats(rows: number, columns: number): Seat[][] {
    const matrix: Seat[][] = [];

    // Crear filas
    for (let i = 0; i < rows; i++) {
      const row: Seat[] = [];
      const rowLetter = String.fromCharCode(65 + i); // Convertir índice en letra (A, B, C, etc.)

      // Crear columnas
      for (let j = 1; j <= columns; j++) {
        row.push({
          row: rowLetter,
          column: j,
          state: 'available', // Estado inicial
        });
      }

      matrix.push(row);
    }

    return matrix;
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
