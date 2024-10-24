import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculaService } from '../../services/pelicula.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {
  peliculaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private peliculaService: PeliculaService,
    private router: Router
  ) {
    this.peliculaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      duracion: [0, Validators.required],
      fechaEstreno: ['', Validators.required],
      genero: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (this.peliculaForm.valid) {
      this.peliculaService.crearPelicula(this.peliculaForm.value).subscribe(() => {
        this.router.navigate(['/admin']);  // Redirigir al panel de administración tras crear
      });
    }
  }
}
