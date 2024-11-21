import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunAdminService {
  constructor() { }

  funciones: string[] = ["14:45 | Sala 7"];
  fechas: string[] = ["MIÉRCOLES \n18/02/2024"];

  addFech(fecha: string){ 
    /*lo que esta adentro es simplemento como nos referiremos al 
    parametro dentro de la funcion*/
    this.fechas.push(fecha);
  } 

  deleteFecha(index: number) {
    // Elimina el elemento en la posición `index`
    this.fechas.splice(index, 1);
  }
  
  addFun(sala: string, horario: string){ 
    /*lo que esta adentro es simplemento como nos referiremos al 
    parametro dentro de la funcion*/
    this.funciones.push(horario + " | " + sala);
  } 

  deleteFunction(index: number) {
    // Elimina el elemento en la posición `index`
    this.funciones.splice(index, 1);
  }
}