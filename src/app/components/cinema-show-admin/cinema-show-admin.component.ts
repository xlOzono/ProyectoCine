import { Component } from '@angular/core';
import { FunAdminService } from 'src/app/fun-admin.service';

@Component({
  selector: 'app-cinema-show-admin',
  templateUrl: './cinema-show-admin.component.html',
  styleUrls: ['./cinema-show-admin.component.css'],
})
export class CinemaShowAdminComponent {
  constructor(public funcion: FunAdminService) {}

  selectedLanguage: string = this.funcion.idioma; // Initialize with service value
  selectedFormat: string = this.funcion.formato; // Initialize with service value
  price: string = '';
  date: string = '';
  hora: string = '';
  sala: string = '';

  // Methods to handle functionality
  removeFecha(indice: number) {
    this.funcion.deleteFecha(indice);
  }

  isSubtitulada() {
    return this.selectedLanguage === 'subtitulada';
  }

  isDoblada(){
    return this.funcion.idioma === 'doblada';
  }

  addFuncion() {
    this.funcion.addFun(this.sala, this.hora);
  }

  removeFuncion(indice: number) {
    this.funcion.deleteFunction(indice);
  }

  selectLanguage(language: string) {
    this.selectedLanguage = language;
    this.funcion.changeIdioma(language); // Update service
  }

  selectFormat(format: string) {
    this.selectedFormat = format;
    this.funcion.changeFormato(format); // Update service
  }

  confirmPrice() {
    this.funcion.changePrecio(this.price);
  }

  addFecha(): void {
    if (!this.date) return;
    const selectedDate = new Date(this.date);
    const days = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

    const dayName = days[selectedDate.getDay()];
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${dayName} ${day}/${month}/${year}`;
    this.funcion.addFech(formattedDate); // Pass it to the service
  }
}
