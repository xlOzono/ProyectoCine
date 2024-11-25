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
    // Verificar si la URL está vacía
    if (!this.imagenUrl.trim()) {
        alert('La URL de la imagen no puede estar vacía.');
        console.error('La URL proporcionada está vacía.');
        return;
    }

    // Validar la estructura de la URL con una expresión regular
    const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(this.imagenUrl)) {
        alert('La URL proporcionada no es válida.');
        console.error('URL no válida:', this.imagenUrl);
        return;
    }

    // Verificar que la URL tenga una extensión de imagen válida
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    const hasValidImageExtension = imageExtensions.some(ext => this.imagenUrl.toLowerCase().endsWith(ext));
    if (!hasValidImageExtension) {
        alert('La URL no apunta a un archivo de imagen válido. Asegúrese de usar formatos como JPG, PNG, etc.');
        console.error('La URL no tiene una extensión válida:', this.imagenUrl);
        return;
    }

    // Confirmar y proceder
    console.log('URL de imagen confirmada:', this.imagenUrl);
    this.promAdminService.changeImage(this.imagenUrl); // Ajusta según tu servicio
}

}
