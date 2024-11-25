import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/services/account.service';
import { Buy } from 'src/app/_models/buy';

@Component({
  selector: 'app-purchase-section',
  templateUrl: './purchase-section.component.html',
  styleUrls: ['./purchase-section.component.css'],
})
export class PurchaseSectionComponent {
  user?: User | null;
  movie_name: string = '';
  date: string = '';
  auditorium: number = 0;
  hour: string = '';
  seats: string[] = [];
  price: number = 0;
  tickets: string = '';
  idioma: string = '';
  format: string = '';

  paymentMethods = [
    { name: 'PayPal', image: '/assets/images/PayPalLogo.png' },
    { name: 'Apple Pay', image: '/assets/images/ApplePayLogo.png' },
    { name: 'Visa', image: '/assets/images/VisaLogo.png' },
    { name: 'MasterCard', image: '/assets/images/MasterCardLogo.png' },
    { name: 'WebPay', image: '/assets/images/WebPayLogo.png' },
  ];

  constructor(
    public accountService: AccountService,
    private route: ActivatedRoute
  ) {
    this.accountService.user.subscribe((x) => (this.user = x));

    // Recuperar los parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      this.movie_name = params['movie'] || '';
      this.date = params['date'] || '';
      this.auditorium = params['auditorium'] || '';
      this.hour = params['time'] || '';
      this.price = +params['price'] || 0; // Convertir a número
      this.seats = params['seats'] ? params['seats'].split(',') : [];
      this.idioma = params['idioma'] || '';
      this.format = params['format'] || '';
    });
  }

  selectedPaymentMethod: number | null = null;

  selectPaymentMethod(index: number): void {
    this.selectedPaymentMethod = index;
  }

  

  get totalPrice(): number {
    const serviceFee = 1800; // Cargo fijo
    return this.price + serviceFee;
  }
  
  completePurchase(): void {
    if (!this.user) {
      alert('Debe iniciar sesión para completar la compra.');
      console.error('Usuario no autenticado.');
      return;
    }

    if (this.selectedPaymentMethod === null) {
      alert('Debe seleccionar un método de pago.');
      console.warn('Método de pago no seleccionado.');
      return;
    }

    // Crear el objeto Buy
    const newPurchase: Buy = {
      movieName: this.movie_name,
      date: this.date,
      auditorium: this.auditorium, // Convertir a número
      hour: this.hour,
      seats: this.seats,
      price: this.totalPrice,
      tickets: `${this.seats.length} entradas - ${this.format} (${this.idioma})`,
    };

    console.log('Compra generada:', newPurchase);

    // Agregar la compra a la lista del usuario
    this.user.addBuy(newPurchase);

    // Confirmación de compra
    alert('Compra realizada con éxito.');
    console.log('Compra agregada a la lista del usuario:', this.user.getBuys());
  }
}
