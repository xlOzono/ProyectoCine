import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { AddShowsComponent } from './components/add-shows/add-shows.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';
import { Role } from './_models/role';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import { PurchaseSectionComponent } from './components/purchase-section/purchase-section.component';
import { PerfilDeUsuarioComponent } from './components/perfil-de-usuario/perfil-de-usuario.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    title: 'CineMax',
  },
  { path: 'account/login', component: LoginComponent, title: 'CineMax' },
  { path: 'account/register', component: RegisterComponent, title: 'CineMax' },
  { path: 'details/:name', component: MovieDetailComponent, canActivate: [AuthGuard] , title: 'CineMax' },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'add-movie', component: MovieInfoComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]} },
  { path: 'add-shows', component: AddShowsComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]} },{
    path: 'add-shows/:name', component: AddShowsComponent},
  { path: 'cineSeats', component: SeatSelectionComponent, title: 'CineMax'},
  { path: 'compra', component: PurchaseSectionComponent, title: 'CineMax'},
  { path: 'seats/:name', component: SeatSelectionComponent, title: 'CineMax'},
  { path: 'details/:name', component: MovieDetailComponent, title: 'CineMax' },
  { path: 'perfil', component: PerfilDeUsuarioComponent, title: 'CineMax' },



  // otherwise redirect to home
  { path: '**', redirectTo: '', title: 'CineMax' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
