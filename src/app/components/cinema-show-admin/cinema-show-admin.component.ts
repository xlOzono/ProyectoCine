import { Component } from '@angular/core';


@Component({
  selector: 'app-cinema-show-admin',
  templateUrl: './cinema-show-admin.component.html',
  styleUrls: ['./cinema-show-admin.component.css']
})
export class CinemaShowAdminComponent {
  selectedLanguage: string = ' ';
  selectedFormat: string = ' ';
  price: string = '';
  date:string = '';

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
