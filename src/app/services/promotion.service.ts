import { Injectable } from '@angular/core';
import { Promotion } from '../models/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  protected promotionList: Promotion[] = [
    {nombre: 'Día del Superhéroe',
      descripcion: '20% OFF en la categoria de Superhéroes',
      porcentaje: 20,
      dias: [],
      fechas: ['21/04/2024, 06/05/2024'],
      horarios: [],
      funciones: ['Superhéroes'],
      imagenUrl: 'https://i.ibb.co/Ntmwgg8/primer-cupon.png',
      promotionCode: 'DFGHL5'},
    {nombre: 'Día del Niño',
      descripcion: '50% de descuento para todos los niños',
      porcentaje: 50,
      dias: [],
      fechas: ['03/08/2024','17/08/2024'],
      horarios: [],
      funciones: [],
      imagenUrl: 'https://i.ibb.co/ZNXh5zm/segundo-cupon.png',
      promotionCode: '79GR7W'},
    {nombre: 'Día del Cine',
      descripcion: '25% OFF en todas las películas',
      porcentaje: 25,
      dias: [],
      fechas: ['30/09/2024','02/10/2024'],
      horarios: [],
      funciones: ['Venom: El Último Baile', 'Guasón 2: Folie à Deux', 'Robot Salvaje', 'Un Panda en África',
                  'Super Man: La Historia de Christopher Reeve', 'La Sustancia', 'Terrifier 3', 'De Noche con el Diablo', 
                    'El Silencio de los Inocentes', 'Sonríe 2'],
      imagenUrl: 'https://i.ibb.co/SwQWGym/tercer-cupon.png',
      promotionCode: 'H3BNDS'},
    {nombre: 'Día de San Valentín',
      descripcion: '15% OFF en la categoría de Romance',
      porcentaje: 15,
      dias: [],
      fechas: ['10/02/2024','17/02/2024'],
      horarios: [],
      funciones: ['Romance'],
      imagenUrl: 'https://i.ibb.co/KNbzbv8/cuarto-cupon.png',
      promotionCode: 'M9XVK7'},
    {nombre: 'Día del Padre',
      descripcion: '10% de Descuento para todos los padres',
      porcentaje: 10,
      dias: [],
      fechas: ['12/06/2024','18/06/2024'],
      horarios: [],
      funciones: [],
      imagenUrl: 'https://i.ibb.co/VDfVzxP/quinto-cupon.png',
      promotionCode: '47UKFE'},
    {nombre: 'Aniversario CinemaMAX',
      descripcion: '25% OFF en todas las películas',
      porcentaje: 25,
      dias: [],
      fechas: [],
      horarios: ['25/11/2024'],
      funciones: ['Venom: El Último Baile', 'Guasón 2: Folie à Deux', 'Robot Salvaje', 'Un Panda en África',
                  'Super Man: La Historia de Christopher Reeve', 'La Sustancia', 'Terrifier 3', 'De Noche con el Diablo', 
                    'El Silencio de los Inocentes', 'Sonríe 2'],
      imagenUrl: 'https://i.ibb.co/7WyvsVD/sexto-cupon.png',
      promotionCode: 'FT46QP'},
    {nombre: 'Día de la Madre',
      descripcion: '15% de descuento para todas las Madres',
      porcentaje: 15,
      dias: [],
      fechas: ['08/05/2024','14/05/2024'],
      horarios: [],
      funciones: [],
      imagenUrl: 'https://i.ibb.co/FBS6wYh/septimo-cupon.png',
      promotionCode: 'HVKBQY'},
    {nombre: 'Día del Universitario',
      descripcion: '30$ de descuento para todos los universitarios',
      porcentaje: 30,
      dias: [],
      fechas: ['10/05/2024','12/05/2024'],
      horarios: [],
      funciones: [],
      imagenUrl: 'https://i.ibb.co/1J37ZJP/octavo-cupon.png',
      promotionCode: 'FPTTZV'}
  ]

  constructor() {}

  getPromotionList(): Promotion[] {
    return this.promotionList;
  }

  addPromotion(newPromotion: Promotion): void {
    this.promotionList.push(newPromotion);
  }

  isNameUnique(name: string): boolean {
    return !this.promotionList.some(promotion => promotion.nombre.toLowerCase() === name.toLowerCase());
  }

  isCodeUnique(code: string): boolean {
    return !this.promotionList.some(promotion => promotion.promotionCode === code);
  }
}
