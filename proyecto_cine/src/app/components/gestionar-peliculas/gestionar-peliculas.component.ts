import { Component, OnInit } from '@angular/core';
import { PeliculaService, Pelicula } from '../../services/pelicula.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionar-peliculas',
  templateUrl: './gestionar-peliculas.component.html',
  styleUrls: ['./gestionar-peliculas.component.css']
})
export class GestionarPeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];  // Lista de películas

  constructor(private peliculaService: PeliculaService, private router: Router) {}

  ngOnInit(): void {
    // Cargamos las películas al iniciar el componente
    this.obtenerPeliculas();
  }

  // Método para obtener todas las películas desde el servicio
  obtenerPeliculas(): void {
    this.peliculaService.getPeliculas().subscribe((data: Pelicula[]) => {
      this.peliculas = data;  // Asignamos las películas a la variable local
    });
  }

  // Navegar al formulario para crear una nueva película
  nuevaPelicula(): void {
    this.router.navigate(['/admin/pelicula/nueva']);
  }

  // Navegar al formulario para editar una película
  editarPelicula(id: number): void {
    this.router.navigate([`/admin/pelicula/${id}/editar`]);
  }

  // Eliminar una película y actualizar la lista
  eliminarPelicula(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      this.peliculaService.eliminarPelicula(id).subscribe(() => {
        this.obtenerPeliculas();  // Volvemos a cargar las películas tras eliminar
      });
    }
  }
}
