import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/models/promotion';
import { PromotionService } from 'src/app/services/promotion.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit{
  isAddPromotionsRoute: boolean = false;
  promotionsList: Promotion[] = []
  user?: User | null;

  constructor(private router: Router,
    private promotionService: PromotionService) {}

  ngOnInit(): void {
    // Observa los cambios en la ruta
    this.router.events.subscribe(() => {
      // Verifica si la ruta actual es '/add-showtimes'
      this.isAddPromotionsRoute = this.router.url === '/add-promotions';
    });
    this.promotionsList = this.promotionService.getPromotionList();
  }

  get isAdmin() {
    return this.user?.role === Role.Admin;
  }

}