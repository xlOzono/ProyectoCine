import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing-module';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { MovieListingComponent } from './components/movie-listing/movie-listing.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { CinemaShowAdminComponent } from './components/cinema-show-admin/cinema-show-admin.component';
import { FormsModule } from '@angular/forms';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CinemaseatsComponent } from './components/cinemaseats/cinemaseats.component';
import { PromotionsListingComponent } from './components/promotions-listing/promotions-listing.component';
import { CreatePromotionsComponent } from './components/create-promotions/create-promotions.component';
import { NameDescriptionComponent } from './components/name-description/name-description.component';
import { PercentageImageComponent } from './components/percentage-image/percentage-image.component';
import { DateScheduleComponent } from './components/date-schedule/date-schedule.component';
import { ShowsDaysComponent } from './components/shows-days/shows-days.component';
import { SavePromotionComponent } from './components/save-promotion/save-promotion.component';
import { DaysDialogComponent } from './components/days-dialog/days-dialog.component';
import { CustomDialogComponent } from './components/custom-dialog/custom-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MovieListingComponent,
    MovieDetailComponent,
    CinemaShowAdminComponent,
    PromotionsComponent,
    CarouselComponent,
    CinemaseatsComponent,
    PromotionsListingComponent,
    CreatePromotionsComponent,
    NameDescriptionComponent,
    PercentageImageComponent,
    DateScheduleComponent,
    ShowsDaysComponent,
    SavePromotionComponent,
    DaysDialogComponent,
    CustomDialogComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    fakeBackendProvider
  ]
})
export class AppModule {}
