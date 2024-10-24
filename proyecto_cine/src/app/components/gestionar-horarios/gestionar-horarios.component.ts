import { Component, OnInit } from '@angular/core';
import { HorarioService, Horario } from '../../services/horario.service';
import { PeliculaService, Pelicula } from '../../services/pelicula.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionar-horarios',
  templateUrl: './gestionar-horarios.component.html',
  styleUrls: ['./gestionar-horarios.component.css']
})
export class GestionarHorariosComponent implements OnInit {
  horarios: Horario[] = [];
  peliculas: Pelicula[] = [];

  constructor(
    private horarioService: HorarioService,
    private peliculaService: PeliculaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerHorarios();
    this.obtenerPeliculas();  // Cargar todas las películas
  }

  // Obtener todos los horarios
  obtenerHorarios(): void {
    this.horarioService.getHorarios().subscribe((data: Horario[]) => {
      this.horarios = data;
    });
  }

  // Obtener todas las películas
  obtenerPeliculas(): void {
    this.peliculaService.getPeliculas().subscribe((data: Pelicula[]) => {
      this.peliculas = data;
    });
  }

  // Método para obtener el título de la película según su ID
  obtenerTituloPelicula(peliculaId: number): string {
    const pelicula = this.peliculas.find(p => p.id === peliculaId);
    return pelicula ? pelicula.titulo : 'Desconocido';  // Si no se encuentra la película, devolvemos 'Desconocido'
  }

  // Navegar al formulario para crear un nuevo horario
  nuevoHorario(): void {
    this.router.navigate(['/admin/horario/nuevo']);
  }

  // Navegar al formulario para editar un horario existente
  editarHorario(id: number): void {
    this.router.navigate([`/admin/horario/${id}/editar`]);
  }

  // Eliminar un horario
  eliminarHorario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      this.horarioService.eliminarHorario(id).subscribe(() => {
        this.obtenerHorarios();  // Volvemos a cargar los horarios tras eliminar
      });
    }
  }
}
