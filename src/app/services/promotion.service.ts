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
      funciones: ['Action'],
      imagenUrl: 'https://i.ibb.co/342bNbB/primer-cupon.png',
      promotionCode: 'DFGHL5'},
    {nombre: 'Super Viernes',
      descripcion: '50% de descuento todos los viernes',
      porcentaje: 50,
      dias: [],
      fechas: ['03/08/2024','17/08/2024'],
      horarios: [],
      funciones: [],
      imagenUrl: 'https://i.ibb.co/kgk8vqm/segundo-cupon.png',
      promotionCode: '79GR7W'},
    {nombre: 'Día del Cine',
      descripcion: '25% OFF en todas las películas',
      porcentaje: 25,
      dias: [],
      fechas: ['30/09/2024','02/10/2024'],
      horarios: [],
      funciones: ['Inception', 'The Shawshank Redemption', 'The Godfather', 'The Dark Knight', 'Pulp Fiction', 
                  "Schindler's List", 'Forrest Gump', 'Fight Club', 'Interstellar','The Matrix', 
                  'Venom: El Último Baile' ],
      imagenUrl: 'https://i.ibb.co/SwQWGym/tercer-cupon.png',
      promotionCode: 'H3BNDS'},
    {nombre: 'Drama Days',
      descripcion: '15% OFF en la categoría de Drama',
      porcentaje: 15,
      dias: [],
      fechas: ['10/02/2024','17/02/2024'],
      horarios: [],
      funciones: ['Drama'],
      imagenUrl: 'https://i.ibb.co/ZY0Pw7z/cuarto-cupon.png',
      promotionCode: 'M9XVK7'},
    {nombre: 'El Buen Finde',
      descripcion: '10% de Descuento este sabado y domingo',
      porcentaje: 10,
      dias: ['Sábado', 'Domingo'],
      fechas: ['23/11/2024','24/11/2024'],
      horarios: [],
      funciones: [],
      imagenUrl: 'https://i.ibb.co/8zr0WLq/quinto-cupon.png',
      promotionCode: '47UKFE'},
    {nombre: 'Aniversario CinemaMAX',
      descripcion: '25% OFF en todas las películas',
      porcentaje: 25,
      dias: [],
      fechas: [],
      horarios: ['25/11/2024'],
      funciones: ['Inception', 'The Shawshank Redemption', 'The Godfather', 'The Dark Knight', 'Pulp Fiction', 
                "Schindler's List", 'Forrest Gump', 'Fight Club', 'Interstellar','The Matrix', 
                'Venom: El Último Baile' ],
      imagenUrl: 'https://i.ibb.co/7WyvsVD/sexto-cupon.png',
      promotionCode: 'FT46QP'}]

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
