import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FunAdminService } from 'src/app/services/fun-admin.service';

@Component({
  selector: 'app-add-shows',
  templateUrl: './add-shows.component.html',
  styleUrls: ['./add-shows.component.css'],
})
export class AddShowsComponent {
  selectedLanguage: string = ''; 
  selectedFormat: string = '';
  fechas: Date[] = [];
  funcionesTemp: string[] = []
  inputPrice: number = 0
  price: number = 0;
  fecha: string = '';
  hora: string = '';
  sala: string = '';
  priceWarning: string = '';
  funcionWarning: string = '';
  fechaWarning: string = '';

  constructor(public funcionService: FunAdminService, private router: Router) {
     const fromAddMovie = sessionStorage.getItem('fromAddMovie');
     if (!fromAddMovie) {
       this.router.navigate(['/']);
     } else {
       sessionStorage.removeItem('fromAddMovie');
     }
  }

  // Methods to handle functionality
  removeFecha(index: number) {
    this.fechas.splice(index, 1);
  }

  isSubtitulada() {
    return this.selectedLanguage === 'subtitulada';
  }

  isDoblada(){
    return this.selectedLanguage === 'doblada';
  }

  addFuncion() {
    const funcion = `${this.hora} | ${this.sala}`;
    if (this.isDuplicateFuncion(funcion)) {
      this.funcionWarning = 'Esta función ya está agregada.';
    } else if (this.isValidFuncion(funcion)) {
      this.funcionesTemp.push(funcion);
      this.funcionWarning = ''; // Clear warning if function is valid
    }
  }

  isValidFuncion(str: string): boolean{
    const regex = /^([01]\d|2[0-3]):([0-5]\d) \| Sala -?\d+$/;
    return regex.test(str);
  }

  removeFuncion(indice: number) {
    this.funcionesTemp.splice(indice, 1);
  }

  selectLanguage(language: string) {
    this.selectedLanguage = language;
  }

  selectFormat(format: string) {
    this.selectedFormat = format;
  }

  confirmPrice() {
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
  
    const result = !this.fechas.some((existingDate) => {
      const formattedExistingDate = formatDate(existingDate); // Format existing date
      const isDuplicate = formattedExistingDate === formattedDateToCheck;
  
      // Log comparison details
      console.log(
        `Comparing: "${formattedExistingDate}" === "${formattedDateToCheck}" -> ${isDuplicate}`
      );
  
      return isDuplicate;
    });
  
    console.log(
      `Result: The date "${formattedDateToCheck}" is ${result ? 'new' : 'duplicate'}.`
    );
    return result;
  }

  isDuplicateFuncion(funcion: string): boolean {
    return this.funcionesTemp.includes(funcion);
  }

  addFecha() {
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

  getFormattedDates(){
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
//FALTA AÑADIR LA CONEXION A LA PAGINA ANTERIOR PARA EXTRAER LOS DATOS DE LA PELICULA
  guardarFunciones(){
    if(this.isValidData()){
      for(const fecha of this.fechas){
        this.funcionService.addFuncion(this.funcionService.funcionesLength()+1,
        this.selectedLanguage, 
        this.selectedFormat,
        this.price,fecha, this.funcionesTemp, 'movie')
      }
    }
  }

  isValidData(): boolean{
  if (!this.selectedLanguage.trim()) {
    return false;
  }

  if (!this.selectedFormat.trim()) {
    return false;
  }

  if (this.fechas.length === 0 || this.funcionesTemp.length === 0) {
    return false;
  }

  if (this.price <= 0) {
    return false;
  }

  return true;
  }

}
