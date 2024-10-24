import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HorarioService } from '../../services/horario.service';
import { PeliculaService, Pelicula } from '../../services/pelicula.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-horario',
  templateUrl: './crear-horario.component.html',
  styleUrls: ['./crear-horario.component.css']
})
export class CrearHorarioComponent implements OnInit {
  horarioForm: FormGroup;
  peliculas: Pelicula[] = [];  // Para seleccionar la película

  constructor(
    private fb: FormBuilder,
    private horarioService: HorarioService,
    private peliculaService: PeliculaService,
    private router: Router
  ) {
    this.horarioForm = this.fb.group({
      peliculaId: ['', Validators.required],
      sala: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Cargar las películas para seleccionar en el formulario
    this.peliculaService.getPeliculas().subscribe((data: Pelicula[]) => {
      this.peliculas = data;
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (this.horarioForm.valid) {
      this.horarioService.crearHorario(this.horarioForm.value).subscribe(() => {
        this.router.navigate(['/admin/horarios']);  // Redirigir al listado de horarios tras crear
      });
    }
  }
}
