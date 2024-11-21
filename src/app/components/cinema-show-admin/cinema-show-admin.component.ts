import { Component } from '@angular/core';
import { FunAdminService } from 'src/app/fun-admin.service';

@Component({
  selector: 'app-cinema-show-admin',
  templateUrl: './cinema-show-admin.component.html',
  styleUrls: ['./cinema-show-admin.component.css']
})
export class CinemaShowAdminComponent {
  constructor( public funcion: FunAdminService ){}

  selectedLanguage: string = ' ';
  selectedFormat: string = ' ';
  price: string = '';
  date:string = '';
  sala:string = '';

  addFuncion(){
    this.funcion.add(this.sala, this.date);
  }

  selectLanguage(language: string) {
    this.selectedLanguage = language;
    console.log(this.selectedLanguage);
  }

  selectFormat(format: string) {
    this.selectedFormat = format;
    console.log(this.selectedFormat);
  }

  confirmPrice() {
    console.log("Precio", this.price);
  }

  addDates() {
    console.log("Aceptar");
  }

}
