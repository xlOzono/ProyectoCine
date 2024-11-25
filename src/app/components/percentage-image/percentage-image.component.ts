import { Component } from '@angular/core';
import { PromAdminService } from 'src/app/services/prom-admin.service';

@Component({
  selector: 'app-percentage-image',
  templateUrl: './percentage-image.component.html',
  styleUrls: ['./percentage-image.component.css']
})
export class PercentageImageComponent {

  constructor (public promAdminService: PromAdminService) {}

  percentage: number = 0;
  imagenUrl:string = '';

  confirmPercentage() {
    if (isNaN(this.percentage) || this.percentage <= 0 || this.percentage >= 100 ) {
      alert('Por favor, ingresa un valor numérico válido mayor que 0 y menor que 100');
      return;
    }
    console.log('Porcentaje confirmado:', this.percentage, '%')
    this.promAdminService.changePercentage(this.percentage);
  }

  confirmImageUrl() {
    if (!this.imagenUrl.trim()) {
        alert('La URL de la imagen no puede estar vacía');
        return;
    }

    console.log('URL de imagen confirmada:', this.imagenUrl);
    this.promAdminService.changeImage(this.imagenUrl); // Ajusta según tu servicio
  }
}
