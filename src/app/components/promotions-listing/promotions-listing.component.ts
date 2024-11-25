import { Component, Input } from '@angular/core';
import { Promotion } from 'src/app/models/promotion';


@Component({
  selector: 'app-promotions-listing',
  templateUrl: './promotions-listing.component.html',
  styleUrls: ['./promotions-listing.component.css']
})
export class PromotionsListingComponent {
  @Input()  promotionsListing!: Promotion

  showPromotionDetails(promotion: Promotion): void {
    let details = '';

    if (promotion.nombre) {
      details += `Nombre: ${promotion.nombre}\n`;
    }
    if (promotion.descripcion) {
      details += `Descripción: ${promotion.descripcion}\n`;
    }
    if (promotion.porcentaje) {
      details += `Porcentaje: ${promotion.porcentaje}%\n`;
    }
    if (promotion.dias && promotion.dias.length > 0) {
      details += `Días: ${promotion.dias.join(', ')}\n`;
    }
    if (promotion.fechas && promotion.fechas.length > 0) {
      details += `Fechas: ${promotion.fechas.join(', ')}\n`;
    }
    if (promotion.horarios && promotion.horarios.length > 0) {
      details += `Horarios: ${promotion.horarios.join(', ')}\n`;
    }
    if (promotion.funciones && promotion.funciones.length > 0) {
      details += `Funciones: ${promotion.funciones.join(', ')}\n`;
    }
    if (promotion.imagenUrl) {
      details += `Imagen URL: ${promotion.imagenUrl}\n`;
    }
    if (promotion.promotionCode) {
      details += `Código de Promoción: ${promotion.promotionCode}\n`;
    }

    if (details) {
      alert(details.trim());
    }
  }
}
