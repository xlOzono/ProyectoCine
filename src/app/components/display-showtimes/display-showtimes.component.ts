import { Component, inject, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcion } from 'src/app/_models/funcion';
import { Movie } from 'src/app/_models/movie';
import { FunAdminService } from 'src/app/services/fun-admin.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-display-showtimes',
  templateUrl: './display-showtimes.component.html',
  styleUrls: ['./display-showtimes.component.css'],
})
export class DisplayShowtimesComponent implements OnInit {
  @Input() movieName?: string; // Nombre de la película pasado desde MovieDetailComponent
  sanitizedTrailerUrl!: SafeResourceUrl; // URL segura para el tráiler
  movieListing?: Movie; // Información de la película
  movieFunciones: Funcion[] = []; // Todas las funciones para la película
  selectedDate: Date | null = null; // Fecha seleccionada
  opcionIdiomas: string[] = ['subtitulada', 'doblada'];
  formatos: string[] = ['2D', '3D', '4D'];

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private funcionService = inject(FunAdminService);

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Obtener el nombre de la película desde la ruta si no está definido
    if (!this.movieName) {
      this.movieName = this.route.snapshot.params['name'];
    }

    // Obtener detalles de la película y sus funciones
    if (this.movieName) {
      this.movieListing = this.movieService.getMovieByName(this.movieName);
      this.movieFunciones = this.funcionService.getMovieFunciones(
        this.movieName
      );
    }

    // Sanitizar la URL del tráiler si existe
    if (this.movieListing?.trailer) {
      this.sanitizedTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.movieListing.trailer
      );
    }
  }

  /**
   * Obtener fechas únicas de las funciones
   */
  getUniqueDates(): Date[] {
    return Array.from(
      new Set(
        this.movieFunciones.map((funcion) => funcion.showDay.toDateString())
      )
    ).map((dateString) => new Date(dateString));
  }

  /**
   * Formatear fecha para mostrar en botones
   */
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    };
    return new Intl.DateTimeFormat('es-CL', options).format(date).toUpperCase();
  }

  /**
   * Seleccionar una fecha
   */
  selectDate(date: Date): void {
    this.selectedDate = date;
  }

  /**
   * Obtener funciones filtradas por idioma, formato y fecha
   */
  movieFuncionesByCriteria(
    opcionIdioma: string,
    formato: string,
    showDay?: Date
  ): Funcion[] {
    return this.movieFunciones.filter((funcion) => {
      const matchesIdioma =
        funcion.opcionIdioma.toLowerCase() === opcionIdioma.toLowerCase();
      const matchesFormato =
        funcion.formato.toLowerCase() === formato.toLowerCase();
      const matchesDate = showDay
        ? funcion.showDay.toDateString() === showDay.toDateString()
        : true;

      return matchesIdioma && matchesFormato && matchesDate;
    });
  }

  /**
   * Obtener horarios según criterios
   */
  getShowTimesByCriteria(
    showDay: Date,
    opcionIdioma: string,
    formato: string
  ): string[] {
    const funciones = this.movieFunciones.filter(
      (funcion) =>
        funcion.showDay.toDateString() === showDay.toDateString() &&
        funcion.opcionIdioma.toLowerCase() === opcionIdioma.toLowerCase() &&
        funcion.formato.toLowerCase() === formato.toLowerCase()
    );

    return funciones.flatMap((funcion) => funcion.showTimes);
  }

  navigateToSeats(time: string, formato: string): void {
    if (this.movieName && this.selectedDate) {
      this.router.navigate(['/seats', this.movieName], {
        queryParams: { time, formato }, // Include the formato parameter
      });
    }
  }
}
