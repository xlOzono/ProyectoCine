import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { CreatePromotionsComponent } from './components/create-promotions/create-promotions.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'test', component: MovieDetailComponent },
  { path: 'add-promotions', component: CreatePromotionsComponent},
  { path: 'PROMOCIONES', component: PromotionsComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
