import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunAdminService {
  constructor() { }

  funciones: string[] = [];
  trailers:string[] = [];
  
  add(sala: string, horario: string){ 
    /*lo que esta adentro es simplemente como nos referiremos al 
    parametro dentro de la funcion*/
    this.funciones.push(horario + " | " + sala);
  }

  addTrailer(link: string) {
    this.trailers.push(link);
  }
}
