import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ClienteDashboardComponent } from './components/cliente-dashboard/cliente-dashboard.component';
import { GestionarPeliculasComponent } from './components/gestionar-peliculas/gestionar-peliculas.component';
import { CrearPeliculaComponent } from './components/crear-pelicula/crear-pelicula.component';
import { EditarPeliculaComponent } from './components/editar-pelicula/editar-pelicula.component';
import { GestionarHorariosComponent } from './components/gestionar-horarios/gestionar-horarios.component';
import { CrearHorarioComponent } from './components/crear-horario/crear-horario.component';
import { EditarHorarioComponent } from './components/editar-horario/editar-horario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    ClienteDashboardComponent,
    GestionarPeliculasComponent,
    CrearPeliculaComponent,
    EditarPeliculaComponent,
    GestionarHorariosComponent,
    CrearHorarioComponent,
    EditarHorarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule 
  ],
  providers: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
