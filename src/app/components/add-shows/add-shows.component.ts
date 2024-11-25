import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FunAdminService } from 'src/app/services/fun-admin.service';
import { Funcion } from 'src/app/_models/funcion';

@Component({
  selector: 'app-add-shows',
  templateUrl: './add-shows.component.html',
  styleUrls: ['./add-shows.component.css'],
})
export class AddShowsComponent implements OnInit {
  selectedLanguage: string = ''; 
  selectedFormat: string = '';
  fechas: Date[] = [];
  funcionesTemp: string[] = [];
  inputPrice: number = 0;
  price: number = 0;
  fecha: string = '';
  hora: string = '';
  sala: string = '';
  priceWarning: string = '';
  funcionWarning: string = '';
  fechaWarning: string = '';

  movieName: string | null = null; // Holds the movie name from the route
  existingFunciones: Funcion[] = []; // Stores existing functions if editing

  constructor(
    public funcionService: FunAdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extract movie name from the route
    this.movieName = this.route.snapshot.paramMap.get('name');

    if (this.movieName) {
      // Load existing functions for the movie if editing

      this.existingFunciones = this.funcionService.getMovieFunciones(this.movieName);
      this.populateFromExistingFunciones(this.existingFunciones);

    } else {
      // Ensure the component is cleared for adding new movie shows
      this.clearInputs();
    }
  }

  clearInputs(): void {
    this.selectedLanguage = '';
    this.selectedFormat = '';
    this.fechas = [];
    this.funcionesTemp = [];
    this.inputPrice = 0;
    this.price = 0;
    this.fecha = '';
    this.hora = '';
    this.sala = '';
    this.priceWarning = '';
    this.funcionWarning = '';
    this.fechaWarning = '';
  }

  populateFromExistingFunciones(funciones: Funcion[]): void {
    if (funciones.length > 0) {
      const firstFuncion = funciones[0];
      this.selectedLanguage = firstFuncion.opcionIdioma;
      this.selectedFormat = firstFuncion.formato;
      this.price = firstFuncion.precio;
      this.fechas = funciones.map((funcion) => funcion.showDay);
      this.funcionesTemp = Array.from(
        new Set(funciones.flatMap((funcion) => funcion.showTimes))
      );
      
    }

  }

  addFuncion(): void {
    const funcion = `${this.hora} | ${this.sala}`;
    if (this.funcionesTemp.includes(funcion)) {
      this.funcionWarning = 'Esta función ya está agregada.';
    } else if (this.isValidFuncion(funcion)) {
      this.funcionesTemp.push(funcion);
      this.funcionWarning = ''; // Clear warning
    }
  }

  isValidFuncion(str: string): boolean {
    const regex = /^([01]\d|2[0-3]):([0-5]\d) \| Sala -?\d+$/;
    return regex.test(str);
  }

  isDuplicateFuncion(funcion: string): boolean {
    return this.funcionesTemp.includes(funcion);
  }

  removeFuncion(indice: number): void {
    this.funcionesTemp.splice(indice, 1);
  }

  removeFecha(index: number) {
    this.fechas.splice(index, 1);
  }

  selectLanguage(language: string): void {
    this.selectedLanguage = language;
  }

  selectFormat(format: string): void {
    this.selectedFormat = format;
  }

  confirmPrice(): void {
    if (this.inputPrice <= 0) {
      this.priceWarning = 'El precio debe ser mayor a 0.';
      this.price = 0; // Reset price if invalid
    } else {
      this.price = this.inputPrice;
      this.priceWarning = ''; // Clear the warning
    }
  }

  isNewDate(dateString: string): boolean {
    const dateToCheck = this.adjustToChileTime(new Date(dateString)); // Adjust to Chile timezone
  
    const formatDate = (date: Date): string => {
      const daysOfWeek = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
      const dayName = daysOfWeek[date.getDay()];
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
      const year = date.getFullYear();
      return `${dayName} ${day}/${month}/${year}`;
    };
  
    const formattedDateToCheck = formatDate(dateToCheck);
  
    return !this.fechas.some((existingDate) => {
      const formattedExistingDate = formatDate(existingDate); // Format existing date
      return formattedExistingDate === formattedDateToCheck;
    });
  }

  addFecha(): void {
    if (this.fecha) {
      if (this.isNewDate(this.fecha)) {
        const selectedDate = new Date(this.fecha);
        this.fechas.push(this.adjustToChileTime(selectedDate)); // Adjust to Chile timezone
        this.fechaWarning = ''; // Clear warning if valid
      } else {
        this.fechaWarning = 'Esta fecha ya está agregada.';
      }
    }

  }

  getFormattedDates(): string[] {
    const daysOfWeek = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
    return this.fechas.map((date) => {
      const dayName = daysOfWeek[date.getDay()];
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${dayName} ${day}/${month}/${year}`;
    });
  }

  adjustToChileTime(date: Date): Date {
    const chileTimezoneOffset = -180;
    const localOffset = date.getTimezoneOffset();
    const adjustedTime = date.getTime() + (localOffset - chileTimezoneOffset) * 60 * 1000;
    return new Date(adjustedTime);
  }

  guardarFunciones(): void {

    if (this.isValidData()) {
      // Prepare new functions to be added or updated
      const newFunciones = this.fechas.map((fecha) => ({
        showID: this.funcionService.funcionesLength() + 1, // Increment ID
        opcionIdioma: this.selectedLanguage,
        formato: this.selectedFormat,
        precio: this.price,
        showDay: fecha,
        showTimes: [...this.funcionesTemp], // Copy the times
        movieName: this.movieName || 'Nueva Película', // Use existing name or fallback
      }));
  
      // Log the new functions being processed
  
      if (this.movieName) {
        // Update existing movie functions
        this.funcionService.updateFunciones(this.movieName, newFunciones);
      } else {
        // Add new functions
        for (const funcion of newFunciones) {
          this.funcionService.addFuncion(
            funcion.showID,
            funcion.opcionIdioma,
            funcion.formato,
            funcion.precio,
            funcion.showDay,
            funcion.showTimes,
            funcion.movieName
          );
        }
      }
      // Redirect after saving
      this.router.navigate(['/']);
    }
  }
  
  

  isValidData(): boolean {
    if (!this.selectedLanguage.trim()) return false;
    if (!this.selectedFormat.trim()) return false;
    if (this.fechas.length === 0 || this.funcionesTemp.length === 0) return false;
    if (this.price <= 0) return false;
    return true;
  }
}
