import { Component, Input } from '@angular/core';
import { Promotion } from 'src/app/models/promotion';


@Component({
  selector: 'app-promotions-listing',
  templateUrl: './promotions-listing.component.html',
  styleUrls: ['./promotions-listing.component.css']
})
export class PromotionsListingComponent {
  @Input()  promotionsListing!: Promotion


}
