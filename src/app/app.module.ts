import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NameDescriptionComponent } from './components/name-description/name-description.component';
import { PercentageImageComponent } from './components/percentage-image/percentage-image.component';
import { DateScheduleComponent } from './components/date-schedule/date-schedule.component';
import { ShowsAgeComponent } from './components/shows-age/shows-age.component';
import { CreatePromotionsComponent } from './components/create-promotions/create-promotions.component';
import { FormsModule } from '@angular/forms';
import { CustomDialogComponent } from './components/custom-dialog/custom-dialog.component';
import { SavePromotionComponent } from './components/save-promotion/save-promotion.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { PromotionsListingComponent } from './components/promotions-listing/promotions-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePromotionsComponent,
    NameDescriptionComponent,
    PercentageImageComponent,
    DateScheduleComponent,
    ShowsAgeComponent,
    CustomDialogComponent,
    SavePromotionComponent,
    PromotionsComponent,
    PromotionsListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
