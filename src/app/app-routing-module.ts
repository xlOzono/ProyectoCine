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

  // otherwise redirect to home
  { path: '**', redirectTo: '', title: 'CineMax' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
