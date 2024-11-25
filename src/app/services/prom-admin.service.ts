import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Promotion } from 'src/app/models/promotion'; // Importa la interfaz

@Injectable({
  providedIn: 'root'
})
export class PromAdminService {
  constructor() { }

  // Datos que necesitamos para la promoción
  porcentaje: number = 0;
  fechas: string[] = [];
  horarios: string[] = [];
  nombre: string = " ";
  descripcion: string = " ";
  funciones: string[] = [];
  dias: string[] = [];
  imagenUrl: string | null = null;
  promotionCode: string = '';
  public promocionSubject = new BehaviorSubject<Promotion | null>(null);

  // Método para cambiar el nombre
  changeNombre(nom: string) {
    this.nombre = nom;
    console.log('Nombre confirmado:', this.nombre);
    alert(`Nombre confirmado: ${this.nombre}`);
    this.emitPromotion();
  }

  // Método para cambiar la descripción
  changeDescripcion(descr: string) {
    this.descripcion = descr;
    console.log('Descripción confirmada:', this.descripcion);
    alert(`Descripción confirmada: ${this.descripcion}`);
    this.emitPromotion();
  }

  // Método para cambiar el porcentaje
  changePercentage(valor: number) {
    this.porcentaje = valor;
    console.log('Porcentaje confirmado:', this.porcentaje, '%');
    alert(`Porcentaje confirmado: ${this.porcentaje} %`);
    this.emitPromotion();
  }

  changeImage(url: string) {
    this.imagenUrl = url;
    console.log('Imagen confirmada', this.imagenUrl);
    alert(`Imagen confirmada: ${this.imagenUrl}`);
    this.emitPromotion();
  }

  // Método para agregar una fecha
  changeFechas(fechas: string[]) {
    this.fechas = [...fechas];
    console.log('Fechas Confirmadas', this.fechas);
    alert(`Fechas Confirmadas: ${this.fechas}`);
    this.emitPromotion()
  }

  // Método para agregar una hora
  changeHorarios(horarios: string[]) {
    this.horarios = [...horarios];
    console.log('Horarios confirmadas:', this.horarios);
    alert(`Horarios confirmadas: ${this.horarios.join(', ')}`)
    this.emitPromotion();
  }

  changeFunciones(funciones: string[]) {
    this.funciones = [...funciones]
    console.log('Funciones confirmadas:', this.funciones);
    alert(`Funciones confirmadas: ${this.funciones.join(', ')}`);
    this.emitPromotion();
  }

  changeDias(dias: string[]) {
    this.dias = [...dias]
    console.log('Días confirmados:', this.dias);
    alert(`Días confirmados: ${this.dias.join(', ')}`);
    this.emitPromotion();
  }

  changeCode(code: string) {
    this.promotionCode = code;
    this.emitPromotion();
  }

  // Método para guardar toda la promoción
  private emitPromotion() {
    const newPromotion: Promotion = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      porcentaje: this.porcentaje,
      dias: this.dias,
      fechas: this.fechas,
      horarios: this.horarios,
      funciones: this.funciones,
      imagenUrl: this.imagenUrl || null,
      promotionCode: this.promotionCode,
    };
    this.promocionSubject.next(newPromotion);
  }
  
  generatePromotionCode(length: number = 6): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }
    return code;
  }

}
