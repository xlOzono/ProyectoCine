import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent implements OnChanges {
  @Input() show: boolean = false;
  @Input() categories: string[] = [];
  @Input() movies: string[] = [];
  
  @Input() selectedCategories: string[] = []; // Categorías seleccionadas desde el padre
  @Input() selectedMovies: string[] = []; // Películas seleccionadas desde el padre

  @Output() closeModal = new EventEmitter<void>();
  @Output() selectionsConfirmed = new EventEmitter<{ categories: string[], movies: string[], type: string }>();

  // Selecciones temporales (almacenadas solo en el modal)
  tempSelectedCategories: string[] = [];
  tempSelectedMovies: string[] = [];
  selectedOption: 'Categorias' | 'Peliculas' | null = null;

  // Este método se llama cuando los inputs cambian
  ngOnChanges(): void {
    if (this.show) {
      this.tempSelectedCategories = [];
      this.tempSelectedMovies = [];
      this.selectedOption = null; // Reseteamos la opción seleccionada al abrir el modal
    }
  }

  // Alternar entre Categorías y Películas
  selectOption(option: 'Categorias' | 'Peliculas') {
    this.selectedOption = option;
  
    // Limpiar selecciones temporales del grupo opuesto y asegurarse de que se limpia la pantalla
    if (option === 'Categorias') {
      this.tempSelectedMovies = [];  // Limpiar películas si estamos seleccionando categorías
    } else {
      this.tempSelectedCategories = [];  // Limpiar categorías si estamos seleccionando películas
    }
  }

  // Selección temporal de categorías
  toggleCategorySelection(category: string) {
    const index = this.tempSelectedCategories.indexOf(category);
    if (index > -1) {
      this.tempSelectedCategories.splice(index, 1);
    } else {
      this.tempSelectedCategories.push(category);
    }
  }
  
  // Selección temporal de películas
  toggleMovieSelection(movie: string) {
    const index = this.tempSelectedMovies.indexOf(movie);
    if (index > -1) {
      this.tempSelectedMovies.splice(index, 1);
    } else {
      this.tempSelectedMovies.push(movie);
    }
  }

  // Confirmar selección y emitir solo en el botón "Aceptar"
  confirmSelection() {
    const type = this.selectedOption === 'Categorias' ? 'categories' : 'movies';
    
    // Emitir solo las selecciones correspondientes
    this.selectionsConfirmed.emit({
      categories: this.selectedOption === 'Categorias' ? [...this.tempSelectedCategories] : [],
      movies: this.selectedOption === 'Peliculas' ? [...this.tempSelectedMovies] : [],
      type: type // Incluir el tipo de selección para que el padre sepa qué se seleccionó
    });
    this.closeModal.emit();
  }

  // Cerrar modal sin enviar datos
  close(): void {
    this.show = false; // Cambiar el valor de 'show' cuando el modal se cierra
  }

  // Abre el modal con categorías y películas iniciales
  open(categories: string[], movies: string[]): void {
    this.tempSelectedCategories = [...categories];
    this.tempSelectedMovies = [...movies];
    this.show = true; // Abre el modal
  }
}
