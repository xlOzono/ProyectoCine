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
import { AddShowsComponent } from './components/add-shows/add-shows.component';
import { FormsModule } from '@angular/forms';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { DisplayShowtimesComponent } from './components/display-showtimes/display-showtimes.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import { PurchaseSectionComponent } from './components/purchase-section/purchase-section.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MovieListingComponent,
    MovieDetailComponent,
    AddShowsComponent,
    MovieInfoComponent,
    ScheduleComponent,
    DisplayShowtimesComponent,
    SeatSelectionComponent,
    PurchaseSectionComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    fakeBackendProvider,
  ],
})
export class AppModule {}
