import { Component } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/services/account.service';
import { PurchaseService } from 'src/app/services/purchase.service'; // Importa el servicio de compras
import { Buy } from 'src/app/_models/buy';

@Component({
  selector: 'app-perfil-de-usuario',
  templateUrl: './perfil-de-usuario.component.html',
  styleUrls: ['./perfil-de-usuario.component.css']
})
export class PerfilDeUsuarioComponent {
  currentView: string = 'compras';
  user?: User | null;
  listBuys?: Buy[];

  constructor(
    public accountService: AccountService,
    private purchaseService: PurchaseService // Inyecta el servicio de compras
  ) {
    // Obtener el usuario actual
    this.accountService.user.subscribe((x) => {
      this.user = x;
      if (this.user) {
        this.listBuys = this.user.listBuys; // Cargar las compras del usuario
      }
    });
  }

  // Cambiar Vista
  changeView(view: string) {
    this.currentView = view; // Cambia la vista activa
  }

  // Añadir una compra simulada
  addMockPurchase() {
    const newPurchase = new Buy(
      'Cinepolis', // Cine
      'Avatar', // Película
      '2024-12-25', // Fecha
      1, // Sala
      "18:00", // Hora
      ['A1', 'A2'], // Asientos
      1000, // Precio
      'Entrada 2D' // Tipo de entrada
    );

    // Usar el servicio de compras para añadir una nueva compra
    this.purchaseService.addPurchase(newPurchase);

    // Actualizar la lista de compras para reflejar los cambios
    this.listBuys = this.purchaseService.getPurchases();
  }
}



