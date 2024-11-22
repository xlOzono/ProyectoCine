import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { CinemaShowAdminComponent } from './components/cinema-show-admin/cinema-show-admin.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    title: 'CineMax',
  },
  { path: 'account/login', component: LoginComponent, title: 'CineMax' },
  { path: 'account/register', component: RegisterComponent, title: 'CineMax' },
  { path: 'details/:name', component: MovieDetailComponent, title: 'CineMax' },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'add-movie', component: MovieInfoComponent },
  { path: 'add-showtimes', component: CinemaShowAdminComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '', title: 'CineMax' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
