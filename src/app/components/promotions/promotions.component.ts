import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/models/promotion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit{
  isAddPromotionsRoute: boolean = false;

  constructor(private router: Router ) {}

  ngOnInit(): void {
    // Observa los cambios en la ruta
    this.router.events.subscribe(() => {
      // Verifica si la ruta actual es '/add-showtimes'
      this.isAddPromotionsRoute = this.router.url === '/add-promotions';
    });
  }

  promotionsListingList: Promotion[] = [
  {nombre: 'Día del Superhéroe',
    descripcion: '20% OFF en la categoria de Superhéroes',
    porcentaje: 20,
    edades: [],
    fechas: ['21/04/2024, 06/05/2024'],
    horarios: [],
    funciones: ['Superhéroes'],
    imagenUrl: 'https://i.ibb.co/Ntmwgg8/primer-cupon.png',
    promotionCode: 'DFGHL5'},
  {nombre: 'Día del Niño',
    descripcion: '50% de descuento para todos los niños',
    porcentaje: 50,
    edades: [{ condition: 'Menores de 15 años', value: 15 }],
    fechas: ['03/08/2024','17/08/2024'],
    horarios: [],
    funciones: [],
    imagenUrl: 'https://i.ibb.co/ZNXh5zm/segundo-cupon.png',
    promotionCode: '79GR7W'},
  {nombre: 'Día del Cine',
    descripcion: '25% OFF en todas las películas',
    porcentaje: 25,
    edades: [],
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
    edades: [],
    fechas: ['10/02/2024','17/02/2024'],
    horarios: [],
    funciones: ['Romance'],
    imagenUrl: 'https://i.ibb.co/KNbzbv8/cuarto-cupon.png',
    promotionCode: 'M9XVK7'},
  {nombre: 'Día del Padre',
    descripcion: '10% de Descuento para todos los padres',
    porcentaje: 10,
    edades: [{ condition: 'Mayores de 20 años', value: 20 }],
    fechas: ['12/06/2024','18/06/2024'],
    horarios: [],
    funciones: [],
    imagenUrl: 'https://i.ibb.co/VDfVzxP/quinto-cupon.png',
    promotionCode: '47UKFE'},
  {nombre: 'Aniversario CinemaMAX',
    descripcion: '25% OFF en todas las películas',
    porcentaje: 25,
    edades: [],
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
    edades: [{ condition: 'Mayores de 20 años', value: 20 }],
    fechas: ['08/05/2024','14/05/2024'],
    horarios: [],
    funciones: [],
    imagenUrl: 'https://i.ibb.co/FBS6wYh/septimo-cupon.png',
    promotionCode: 'HVKBQY'},
  {nombre: 'Día del Universitario',
    descripcion: '30$ de descuento para todos los universitarios',
    porcentaje: 30,
    edades: [{ condition: 'Mayores de 18 años', value: 18 }, { condition: 'Menores de 28 años', value: 28 }],
    fechas: ['10/05/2024','12/05/2024'],
    horarios: [],
    funciones: [],
    imagenUrl: 'https://i.ibb.co/1J37ZJP/octavo-cupon.png',
    promotionCode: 'FPTTZV'}]
}