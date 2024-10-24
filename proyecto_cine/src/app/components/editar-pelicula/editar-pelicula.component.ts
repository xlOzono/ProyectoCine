import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculaService, Pelicula } from '../../services/pelicula.service';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {
  peliculaForm: FormGroup;
  peliculaId!: number;

  constructor(
    private fb: FormBuilder,
    private peliculaService: PeliculaService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    // Obtener el ID de la película de la ruta
    this.peliculaId = +this.route.snapshot.paramMap.get('id')!;
    
    // Cargar la información de la película
    this.peliculaService.getPelicula(this.peliculaId).subscribe((pelicula: Pelicula) => {
      this.peliculaForm.patchValue(pelicula);  // Pre-rellenar los valores en el formulario
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (this.peliculaForm.valid) {
      this.peliculaService.actualizarPelicula(this.peliculaId, this.peliculaForm.value).subscribe(() => {
        this.router.navigate(['/admin']);  // Redirigir al panel de administración tras editar
      });
    }
  }
}
