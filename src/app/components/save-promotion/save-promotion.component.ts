import { Component, OnInit } from '@angular/core';
import { PromAdminService } from 'src/app/services/prom-admin.service';
import { MovieService } from 'src/app/services/movie.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { Promotion } from 'src/app/models/promotion';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-save-promotion',
  templateUrl: './save-promotion.component.html',
  styleUrls: ['./save-promotion.component.css']
})
export class SavePromotionComponent implements OnInit {
  promotion: Promotion | null = null
  movies: Movie[] = [];
  nuevaPromocion: Promotion | null = null;
  promotionCode: string = '';

  constructor(public promAdminService: PromAdminService,
    private movieService: MovieService,
    private promotionService: PromotionService) {}

    ngOnInit() {
      // Suscribirse al Subject del servicio para obtener los datos de la promoción
      this.promAdminService.promocionSubject.subscribe((promotionData) => {
        if (promotionData) {
          this.promotion = promotionData;
          console.log('Promoción actualizada:', this.promotion);
        }
      });
      
      // Obtén la lista de películas usando el servicio MoviesService
      this.movies = this.movieService.getMovieList();
    }

  savePromotion() {
    console.log('Validando promoción:', this.promotion)
    if (
      !this.promotion?.nombre?.trim() ||
      !this.promotion.descripcion?.trim() ||
      typeof this.promotion.porcentaje !== 'number' ||
      this.promotion.porcentaje < 1 ||
      this.promotion.porcentaje > 99 ||
      !this.promotion.imagenUrl // Validar que imagenUrl esté definido
    ) {
      console.error('Por favor, complete todos los campos obligatorios.');
      alert('Por favor, complete todos los campos obligatorios (Nombre, Descripción, Porcentaje, Imágen).');
      return; // No continuar si faltan campos
    }

    if (!this.promotionService.isNameUnique(this.promotion.nombre)) {
      alert('El nombre de la promoción ya está en uso. Por favor, elija otro.');
      console.error('Nombre de la promoción duplicado.');
      return;
    }

    let fechasImprimir = '';
    if (this.promotion.fechas && this.promotion.fechas.length >= 2) {
      const startDate = new Date(`${this.promotion.fechas[0]}T00:00:00`);
      const endDate = new Date(`${this.promotion.fechas[1]}T00:00:00`);
      fechasImprimir = `Desde: ${startDate.toLocaleDateString()} Hasta: ${endDate.toLocaleDateString()}`;
    }

    let horariosImprimir = '';
    if (this.promotion.horarios && this.promotion.horarios.length > 0) {
      const startHour = this.promotion.horarios[0]; // Primer horario (inicio)
      const endHour = this.promotion.horarios[1];   // Segundo horario (fin)
      horariosImprimir = `Desde las ${startHour} Hasta las ${endHour}`;
    }
    

    const confirmation = window.confirm(
      `La siguiente promoción se va a crear:\n\n` +
      `Nombre: ${this.promotion.nombre.trim()}\n` +
      `Descripción: ${this.promotion.descripcion.trim()}\n` +
      `Porcentaje: ${this.promotion.porcentaje}\n` +
      `Imagen URL: ${this.promotion.imagenUrl}\n` +
      `Fechas: ${fechasImprimir}\n` +
      `Horas: ${horariosImprimir}\n` +
      `Funciones: ${this.promotion.funciones}\n` +
      `Días: ${this.promotion.dias}\n` +
      `¿Desea continuar?`
    );

    if (confirmation) {

    let generatedCode = this.promAdminService.generatePromotionCode();
    while (!this.promotionService.isCodeUnique(generatedCode)) {
      console.log('Código duplicado detectado. Generando uno nuevo...');
      generatedCode = this.promAdminService.generatePromotionCode();
    }
    console.log('Código único generado:', generatedCode);

    const promotion: Promotion = {
      nombre: this.promotion.nombre.trim(),
      descripcion: this.promotion.descripcion.trim(),
      porcentaje: this.promotion.porcentaje,
      dias: this.promotion.dias.length ? this.promotion.dias : [],
      fechas: this.promotion.fechas.length ? this.promotion.fechas : [],
      horarios: this.promotion.horarios.length ? this.promotion.horarios : [],
      funciones: this.promotion.funciones.length ? this.promotion.funciones : [],
      imagenUrl: this.promotion.imagenUrl,
      promotionCode: generatedCode
    };

      this.promotionService.addPromotion(promotion);
      this.promAdminService.promocionSubject.next(promotion);
      this.nuevaPromocion = promotion;
      console.log('Promoción guardada:', promotion);
    } else {
      console.log('La creación de la promoción fue cancelada.');
    }
  }

  get fechasFormateadas(): string {
    let fechasImprimir = '';
    
    if (this.nuevaPromocion != null) {
      if (this.nuevaPromocion.fechas && this.nuevaPromocion.fechas.length >= 2) {
        const startDate = new Date(`${this.nuevaPromocion.fechas[0]}T00:00:00`); // Asumiendo que la primera fecha es la de inicio
        const endDate = new Date(`${this.nuevaPromocion.fechas[1]}T00:00:00`); // Asumiendo que la segunda fecha es la de fin
        const startDateStr = startDate.toLocaleDateString(); // Formato de fecha
        const endDateStr = endDate.toLocaleDateString(); // Formato de fecha
        fechasImprimir = `Desde: ${startDateStr} Hasta: ${endDateStr}`;
      }
    }

    return fechasImprimir;
  }

  get horariosFormateados(): string {
    let horariosImprimir = '';
  
    if (this.nuevaPromocion != null) {
      if (this.nuevaPromocion.horarios && this.nuevaPromocion.horarios.length >= 2) {
        const startHour = this.nuevaPromocion.horarios[0]; // Primer horario (inicio)
        const endHour = this.nuevaPromocion.horarios[1];   // Segundo horario (fin)
    
        horariosImprimir = `Desde las ${startHour} Hasta las ${endHour}`;
      }
    }
    return horariosImprimir;
  }


  isMovies(funciones: string[]): boolean {
    return funciones.some(func => 
      this.movies.some(movie => movie.name === func)
    );
  }

  getImageUrl(): string {
    if (this.nuevaPromocion && this.nuevaPromocion.imagenUrl) {
      return this.nuevaPromocion.imagenUrl; // Devuelve la URL directamente
    }
    return '';  // Si no hay URL, devuelve una cadena vacía
  }

  // Generar un codigo aleatorio de 6 caracteres para la promocion
  
}
