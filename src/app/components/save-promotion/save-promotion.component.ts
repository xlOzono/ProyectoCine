import { Component, OnInit } from '@angular/core';
import { PromAdminService } from 'src/app/services/prom-admin.service';
import { SendMoviesService } from 'src/app/services/send-movies.service';
import { Promotion } from 'src/app/models/promotion';

@Component({
  selector: 'app-save-promotion',
  templateUrl: './save-promotion.component.html',
  styleUrls: ['./save-promotion.component.css']
})
export class SavePromotionComponent implements OnInit {
  promotion: Promotion | null = null
  movies: string[] = [];
  nuevaPromocion: Promotion | null = null;
  promotionCode: string = '';

  constructor(public promAdminService: PromAdminService,
    private sendMoviesService: SendMoviesService) {}

  ngOnInit() {
    // Suscribirse al Subject del servicio para obtener los datos de la promoción
    this.promAdminService.promocionSubject.subscribe((promotionData) => {
      if (promotionData) {
        this.promotion = promotionData;
        console.log('Promoción actualizada:', this.promotion);
      }
    });
    this.movies = this.sendMoviesService.getMovies();
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


    const fechasConfirmadas = this.promAdminService.getFechas();

    let fechasImprimir = '';
    if (fechasConfirmadas && fechasConfirmadas.length >= 2) {
      const startDate = new Date(`${fechasConfirmadas[0]}T00:00:00`);
      const endDate = new Date(`${fechasConfirmadas[1]}T00:00:00`);
      fechasImprimir = `Desde: ${startDate.toLocaleDateString()} Hasta: ${endDate.toLocaleDateString()}`;
    }

    const horariosConfirmados = this.promAdminService.getHorarios();

    let horariosImprimir = '';
    if (horariosConfirmados && horariosConfirmados.length > 0) {
      const startHour = horariosConfirmados[0]; // Primer horario (inicio)
      const endHour = horariosConfirmados[1];   // Segundo horario (fin)
      horariosImprimir = `Desde las ${startHour} Hasta las ${endHour}`;
    }

    const funcionesConfirmadas = this.promAdminService.getFunciones();

    const edadesConfirmadas = this.promAdminService.getEdades();

    let edadesImprimir = '';
    if (edadesConfirmadas && edadesConfirmadas.length > 0) {
      edadesImprimir = edadesConfirmadas
      .map((edad) => edad.condition) // Accedemos directamente a la propiedad `condition`
      .join(', '); // Unir las condiciones con coma
    }
    

    const confirmation = window.confirm(
      `La siguiente promoción se va a crear:\n\n` +
      `Nombre: ${this.promotion.nombre.trim()}\n` +
      `Descripción: ${this.promotion.descripcion.trim()}\n` +
      `Porcentaje: ${this.promotion.porcentaje}\n` +
      `Imagen URL: ${this.promotion.imagenUrl}\n` +
      `Fechas: ${fechasImprimir}\n` +
      `Horas: ${horariosImprimir}\n` +
      `Funciones: ${funcionesConfirmadas}\n` +
      `Edades: ${edadesImprimir}\n` +
      `¿Desea continuar?`
    );

    if (confirmation) {

    const generatedCode = this.promAdminService.generatePromotionCode();
    console.log('Código de promoción generado:', generatedCode);
    this.promAdminService.changeCode(generatedCode)

    const promotion: Promotion = {
      nombre: this.promotion.nombre.trim(),
      descripcion: this.promotion.descripcion.trim(),
      porcentaje: this.promotion.porcentaje,
      edades: this.promotion.edades.length ? this.promotion.edades : [],
      fechas: this.promotion.fechas.length ? this.promotion.fechas : [],
      horarios: this.promotion.horarios.length ? this.promotion.horarios : [],
      funciones: this.promotion.funciones.length ? this.promotion.funciones : [],
      imagenUrl: this.promotion.imagenUrl,
      promotionCode: generatedCode
    };

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

  get edadesFormateadas(): string {
    if (!this.nuevaPromocion?.edades || this.nuevaPromocion.edades.length === 0) {
      return ''; // Si no hay edades, retorna una cadena vacía
    }
    
    return this.nuevaPromocion.edades
      .map((edad: { condition: string, value: number }) => {
        // Formatea correctamente los datos basados en las propiedades 'condition' y 'value'
        if (edad.condition && edad.value != null) {
          return `${edad.condition}`;
        }
        return 'Sin datos...';
      })
      .join(', '); // Si quieres que las edades aparezcan separadas por coma
  }

  isMovies(funciones: string[]): boolean {
    return funciones.some(func => this.movies.includes(func));
  }

  getImageUrl(): string {
    if (this.nuevaPromocion && this.nuevaPromocion.imagenUrl) {
      return this.nuevaPromocion.imagenUrl; // Devuelve la URL directamente
    }
    return '';  // Si no hay URL, devuelve una cadena vacía
  }

  // Generar un codigo aleatorio de 6 caracteres para la promocion
  
}
