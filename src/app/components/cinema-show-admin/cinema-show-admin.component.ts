import { Component } from '@angular/core';
import { FunAdminService } from 'src/app/fun-admin.service';

@Component({
  selector: 'app-cinema-show-admin',
  templateUrl: './cinema-show-admin.component.html',
  styleUrls: ['./cinema-show-admin.component.css']
})
export class CinemaShowAdminComponent {
  constructor( public funcion: FunAdminService){}

  selectedLanguage: string = ' ';
  selectedFormat: string = ' ';
  price: string = '';
  date:string = '';
  hora: string = '';
  sala:string = '';



  removeFecha(indice: number){
    this.funcion.deleteFecha(indice);
  }
//--------------------------------------------------------------------------------------

  addFuncion(){
    this.funcion.addFun(this.sala, this.hora);
  }

  removeFuncion(indice: number){
    this.funcion.deleteFunction(indice);
  }
//--------------------------------------------------------------------------------------

  selectLanguage() {
    this.funcion.changeIdioma(this.selectedLanguage);
  }

  selectFormat() {
    this.funcion.changeFormato(this.selectedFormat);
  }

  confirmPrice() {
    this.funcion.changePrecio(this.price);
  }

  addFecha(): void {
    if (!this.date) {}
    const selectedDate = new Date(this.date);
    
    const days = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado','domingo'];

    const dayName = days[selectedDate.getDay()];
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = (selectedDate.getDate() + 1).toString().padStart(2, '0');

    const formattedDate = `${dayName} ${day}/${month}/${year}`;
    
    this.funcion.addFech(formattedDate); //pasarselo al servicio

  }
}
