import { Component, ViewChild, OnInit } from '@angular/core';
import { PromAdminService } from 'src/app/services/prom-admin.service';
import { MovieService } from 'src/app/services/movie.service';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-shows-days',
  templateUrl: './shows-days.component.html',
  styleUrls: ['./shows-days.component.css']
})
export class ShowsDaysComponent implements OnInit {

  constructor(public promAdminService: PromAdminService,
  private movieService: MovieService) {}

  @ViewChild(CustomDialogComponent) customDialog!: CustomDialogComponent;

  categories: string[] = [];
  movies: string[] = [];
  diasDisponibles: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  ngOnInit(): void {
    this.loadMoviesAndCategories();
  }

  private loadMoviesAndCategories(): void {
    const movies = this.movieService.getMovieList();
    this.categories = [...new Set(movies.map((movie) => movie.genre))];
    this.movies = movies.map((movie) => movie.name);
  }

  selectedCategories: string[] = [];
  selectedMovies: string[] = [];
  diasSeleccionados: string[] = [];
  showCustomModal = false;
  showDiasDialog: boolean = false;
  buttonTextFunciones: string = 'AGREGAR';
  buttonTextDias: string = 'AGREGAR';
  showFuncionesButton = false;
  showDiasButton = false;
  showConfirmFuncionesButton = false;
  showConfirmDiasButton = false;

  funciones: string[] = [];

  toggleFuncionesButton(): void {
    this.showFuncionesButton = !this.showFuncionesButton; // Alterna el estado del segundo botón
    this.buttonTextFunciones = this.showFuncionesButton ? 'QUITAR' : 'AGREGAR'; // Actualiza el texto
    if (!this.showFuncionesButton) {
      this.resetSelections(); // Borra las selecciones
      this.showConfirmFuncionesButton = false; // Oculta el botón de confirmación
      this.confirmFunciones()
    } else {
      this.showConfirmFuncionesButton = true; // Muestra el botón de confirmación cuando se presiona "AGREGAR"
    }
  }

  resetSelections(): void {
    // Limpia las selecciones si se cierra el segundo botón
    this.selectedCategories = [];
    this.selectedMovies = [];
    this.funciones = [];
  }

  openCustomModal(): void {
    this.customDialog.open(this.selectedCategories, this.selectedMovies);
  }

  closeCustomModal(): void {
    if (this.customDialog) {
      this.customDialog.close(); // llama al método close de CustomDialogComponent
    }
  }

  onSelectionsConfirmed(event: { categories: string[], movies: string[], type: string }): void {
    if (event.type === 'movies') {
      this.selectedMovies = event.movies;
      this.selectedCategories = [];
      this.funciones = [...event.movies];
    } else if (event.type === 'categories') {
      this.selectedCategories = event.categories;
      this.selectedMovies = [];
      this.funciones = [...event.categories];
    }
  }

  confirmFunciones() {
    // Procesamos las funciones seleccionadas
    this.promAdminService.changeFunciones(this.funciones);
  }

  toggleDiasButton(): void {
    this.showDiasButton = !this.showDiasButton; // Alterna el estado del botón
    this.buttonTextDias = this.showDiasButton ? 'QUITAR' : 'AGREGAR'; // Actualiza el texto
  
    if (!this.showDiasButton) {
      this.diasSeleccionados = []; // Borra las selecciones si se quita
      this.showConfirmDiasButton = false; // Oculta el botón de confirmación
      this.confirmDias(); // Llama a una acción de confirmación, si aplica
    } else {
      this.showConfirmDiasButton = true; // Muestra el botón de confirmación si se agrega
    }
  }

  confirmDias() {
    this.promAdminService.changeDias(this.diasSeleccionados);
  } 

  openDiasModal() {
    this.showDiasDialog = true;
  }

  closeDiasModal() {
    this.showDiasDialog = false;
  }

  onDiasConfirmados(dias: string[]) {
    this.diasSeleccionados = this.ordenarDiasSeleccionados(dias); // Ordenamos los días seleccionados
    this.closeDiasModal();
  }

  ordenarDiasSeleccionados(diasSeleccionados: string[]): string[] {
    return diasSeleccionados.sort((a, b) => {
      return this.diasDisponibles.indexOf(a) - this.diasDisponibles.indexOf(b);
    });
  }


}
