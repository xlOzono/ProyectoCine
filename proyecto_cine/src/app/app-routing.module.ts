import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ClienteDashboardComponent } from './components/cliente-dashboard/cliente-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { CrearPeliculaComponent } from './components/crear-pelicula/crear-pelicula.component';
import { EditarPeliculaComponent } from './components/editar-pelicula/editar-pelicula.component';
import { CrearHorarioComponent } from './components/crear-horario/crear-horario.component';
import { EditarHorarioComponent } from './components/editar-horario/editar-horario.component';
import { GestionarHorariosComponent } from './components/gestionar-horarios/gestionar-horarios.component';

const routes: Routes = [
  // Login Route
  { path: 'login', component: LoginComponent },

  // Admin Routes (Protected by AuthGuard and RoleGuard for role ADMIN)
  { 
    path: 'admin', 
    component: AdminDashboardComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { role: 'ADMIN' } 
  },
  { 
    path: 'admin/pelicula/nueva', 
    component: CrearPeliculaComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { role: 'ADMIN' } 
  },
  { 
    path: 'admin/pelicula/:id/editar', 
    component: EditarPeliculaComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { role: 'ADMIN' } 
  },
  { 
    path: 'admin/horarios', 
    component: GestionarHorariosComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { role: 'ADMIN' } 
  },
  { 
    path: 'admin/horario/nuevo', 
    component: CrearHorarioComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { role: 'ADMIN' } 
  },
  { 
    path: 'admin/horario/:id/editar', 
    component: EditarHorarioComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { role: 'ADMIN' } 
  },

  // Cliente Routes (Protected by AuthGuard and RoleGuard for role CLIENT)
  { 
    path: 'cliente', 
    component: ClienteDashboardComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { role: 'CLIENT' } 
  },

  // Default Route
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Catch-all Route (This should always be last)
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
