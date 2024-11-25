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
  edades: { condition: string, value: number }[] = [];
  imagenUrl: string | null = null;
  promotionCode: string = '';
  public promocionSubject = new BehaviorSubject<Promotion | null>(null);

  // Método para cambiar el nombre
  changeNombre(nom: string) {
    this.nombre = nom;
    console.log('Nombre confirmado:', this.nombre);
    this.emitPromotion();
  }

  // Método para cambiar la descripción
  changeDescripcion(descr: string) {
    this.descripcion = descr;
    this.emitPromotion();
  }

  // Método para cambiar el porcentaje
  changePercentage(valor: number) {
    this.porcentaje = valor;
    this.emitPromotion();
  }

  changeImage(url: string) {
    this.imagenUrl = url; // Asignamos la URL de la imagen
    console.log('Imagen asignada', this.imagenUrl); // Verifica que se haya asignado correctamente
    this.emitPromotion();
  }

  // Método para agregar una fecha
  changeFechas(fechas: string[]) {
    this.fechas = [...fechas];
  }

  getFechas(): string[] {
    return this.fechas;
  }

  // Método para agregar una hora
  changeHorarios(horarios: string[]) {
    this.horarios = [...horarios];
  }

  getHorarios(): string[] {
    return this.horarios;
  }

  // Método para eliminar una hora
  deleteHora(index: number) {
    this.horarios.splice(index, 1);
  }

  changeFunciones(funciones: string[]) {
    this.funciones = [...funciones]
  }

  changeEdades(edades: { condition: string, value: number }[] = []) {
    this.edades = [...edades]
  }

  getFunciones(): string[] {
    return this.funciones
  }

  getEdades(): any[] {
    return this.edades
  }

  // Método para obtener las edades (puede ser útil si necesitas recuperarlas en algún punto)

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
      edades: this.edades,
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
