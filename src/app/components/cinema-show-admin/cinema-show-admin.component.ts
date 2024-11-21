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

  addFecha(){
    this.funcion.addFech(this.date);
  }

  removeFecha(indice: number){
    this.funcion.deleteFecha(indice);
  }


  addFuncion(){
    this.funcion.addFun(this.sala, this.hora);
  }

  removeFuncion(indice: number){
    this.funcion.deleteFunction(indice);
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

}
