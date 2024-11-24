import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Funcion } from 'src/app/_models/funcion';
import { Movie } from 'src/app/_models/movie';
import { FunAdminService } from 'src/app/services/fun-admin.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-display-showtimes',
  templateUrl: './display-showtimes.component.html',
  styleUrls: ['./display-showtimes.component.css']
})
export class DisplayShowtimesComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  movieService = inject(MovieService);
  funcionService = inject(FunAdminService);
  movieListing: Movie | undefined;
  sanitizedTrailerUrl!: SafeResourceUrl;
  movieFunciones: Funcion[] = []; // All functions for the movie
  selectedDate: Date | null = null; // To track the selected date, starts as null
  filteredFunciones: Funcion[] = [];
  opcionIdiomas: string[] = ['subtitulada', 'doblada'];
  formatos: string[] = ['2D', '3D', '4D'];


  constructor(private sanitizer: DomSanitizer) {
    const movieName = String(this.route.snapshot.params['name']);
    this.movieListing = this.movieService.getMovieByName(movieName);
    this.movieFunciones = this.funcionService.getMovieFunciones(movieName);
  }

  ngOnInit(): void {
    // Sanitize the trailer URL
    if (this.movieListing?.trailer) {
      this.sanitizedTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.movieListing.trailer
      );
    }
  }

  getUniqueDates(): Date[] {
    return Array.from(
      new Set(this.movieFunciones.map((funcion) => funcion.showDay.toDateString()))
    ).map((dateString) => new Date(dateString));
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    };
    return new Intl.DateTimeFormat('es-CL', options).format(date).toUpperCase();
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
  }

  movieFuncionesByCriteria(
    opcionIdioma: string,
    formato: string,
    showDay?: Date
  ): Funcion[] {
    return this.movieFunciones.filter((funcion) => {
      const matchesIdioma = funcion.opcionIdioma.toLowerCase() === opcionIdioma.toLowerCase();
      const matchesFormato = funcion.formato.toLowerCase() === formato.toLowerCase();
      const matchesDate = showDay
        ? funcion.showDay.toDateString() === showDay.toDateString()
        : true; // If no date is provided, skip date filtering
  
      return matchesIdioma && matchesFormato && matchesDate;
    });
  }

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
  
  
}
