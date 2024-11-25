import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/models/promotion';
import { PromotionService } from 'src/app/services/promotion.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {
  isAddPromotionsRoute: boolean = false;
  promotionsList: Promotion[] = []
  user?: User | null;

  constructor(
    private promotionService: PromotionService,
    private accountService: AccountService
  ) {}
  
  ngOnInit(): void {
    this.accountService.user.subscribe(user => {
      this.user = user;
      if (this.user) {
        this.promotionsList = this.promotionService.getPromotionList();
      }
    });
  }

  get isAdmin(): boolean {
    return this.user?.role === Role.Admin || false;
  }

}