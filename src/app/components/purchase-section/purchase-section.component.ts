import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-purchase-section',
  templateUrl: './purchase-section.component.html',
  styleUrls: ['./purchase-section.component.css'],
})
export class PurchaseSectionComponent {
  user?: User | null;
  movie_name: string = '';
  date: string = '';
  auditorium: string = '';
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
}
