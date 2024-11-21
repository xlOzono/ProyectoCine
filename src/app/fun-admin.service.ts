import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunAdminService {
  constructor() { }

  funciones: string[] = [];
  
  add(sala: string, horario: string){ 
    /*lo que esta adentro es simplemento como nos referiremos al 
    parametro dentro de la funcion*/
    this.funciones.push(horario + " | " + sala);
  } 
}
