import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { PerfilDeUsuarioComponent } from './components/perfil-de-usuario/perfil-de-usuario.component';
import { PurchaseSectionComponent } from './components/purchase-section/purchase-section.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], title: 'CineMax' },
  { path: 'account/login', component: LoginComponent, title: 'CineMax' },
  { path: 'account/register', component: RegisterComponent, title: 'CineMax' },
  { path: 'details/:name', component: MovieDetailComponent, title: 'CineMax' },
  { path: 'perfil', component: PerfilDeUsuarioComponent, title: 'CineMax' },
  { path: 'purchase', component: PurchaseSectionComponent, title: 'CineMax' },


  // otherwise redirect to home
  { path: '**', redirectTo: '' , title: 'CineMax'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
