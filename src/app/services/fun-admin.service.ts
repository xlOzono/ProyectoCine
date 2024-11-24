import { Injectable } from '@angular/core';
import { Funcion } from '../_models/funcion';

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
    },
    {
      showID: 2,
      opcionIdioma: 'subtitulada',
      formato: '3D',
      precio: 6000,
      showDay: new Date('2024-12-02'),
      showTimes: ['16:00 | Sala 3', '19:00 | Sala 4'],
      movieName: 'Inception',
    },
    {
      showID: 3,
      opcionIdioma: 'doblada',
      formato: '4D',
      precio: 8000,
      showDay: new Date('2024-12-03'),
      showTimes: ['14:00 | Sala 5', '17:00 | Sala 6'],
      movieName: 'Inception',
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
    },
    {
      showID: 5,
      opcionIdioma: 'subtitulada',
      formato: '3D',
      precio: 5000,
      showDay: new Date('2024-12-04'),
      showTimes: ['15:00 | Sala 1', '18:00 | Sala 2'],
      movieName: 'The Shawshank Redemption',
    },
    {
      showID: 6,
      opcionIdioma: 'doblada',
      formato: '4D',
      precio: 7000,
      showDay: new Date('2024-12-05'),
      showTimes: ['13:00 | Sala 5', '16:00 | Sala 7'],
      movieName: 'The Shawshank Redemption',
    },
  ];

  addFuncion(showID: number,
    opcionIdioma: string,
    formato: string,
    precio: number,
    showDay: Date,
    showTimes: string[],
    movieName: string){
    this.movieFunciones.push({showID,
      opcionIdioma,
      formato,
      precio,
      showDay,
      showTimes,
      movieName,
    })
  }

  getMovieFunciones(movieName: string): Funcion[] {
    return this.movieFunciones.filter(
      (funcion) => funcion.movieName.toLowerCase() === movieName.toLowerCase()
    );
  }

  funcionesLength(): number{
    return this.movieFunciones.length;
  }

  movieExists(movieName: string): boolean{
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
      // Movie not found
      return false;
    }

    // Update the attributes of the movie
    this.movieFunciones[index] = {
      ...this.movieFunciones[index],
      ...updatedAttributes,
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
  
      const isSameIdioma = funcion.opcionIdioma.toLowerCase() === opcionIdioma.toLowerCase();
      const isSameFormato = funcion.formato.toLowerCase() === formato.toLowerCase();
      const isSameMovieName = funcion.movieName.toLowerCase() === movieName.toLowerCase();
  
      return isSameDate && isSameIdioma && isSameFormato && isSameMovieName;
    });
  }
  
  

}
