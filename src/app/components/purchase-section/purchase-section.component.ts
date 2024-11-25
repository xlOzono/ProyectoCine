import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/_models/user';
import { SeatService } from 'src/app/services/seat.service';
import { MovieService } from 'src/app/services/movie.service';
import { FuncionService } from 'src/app/services/funcion.service';

@Component({
  selector: 'app-purchase-section',
  templateUrl: './purchase-section.component.html',
  styleUrls: ['./purchase-section.component.css']
})
export class PurchaseSectionComponent {
  user?: User | null
  movie_name: string = '';
  date: string = '';
  auditorium: number = 0;
  hour: number = 0;
  seats: string[] = [];
  price: number = 0;
  tickets: string = '';

  paymentMethods = [
    { name: 'PayPal', image: '/assets/images/PayPalLogo.png' },
    { name: 'Apple Pay', image: '/assets/images/ApplePayLogo.png' },
    { name: 'Visa', image: '/assets/images/VisaLogo.png' },
    { name: 'MasterCard', image: '/assets/images/MasterCardLogo.png' },
    { name: 'WebPay', image: '/assets/images/WebPayLogo.png' }
  ];
  

  constructor(public accountService: AccountService){
    this.accountService.user.subscribe(x => this.user = x)
  }
  
  selectedPaymentMethod: number | null = null;

  selectPaymentMethod(index: number): void {
    this.selectedPaymentMethod = index;
  }

} 
