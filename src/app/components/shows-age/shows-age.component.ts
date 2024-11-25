import { Component, ViewChild, OnInit } from '@angular/core';
import { PromAdminService } from 'src/app/services/prom-admin.service';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { SendMoviesService } from 'src/app/services/send-movies.service';

@Component({
  selector: 'app-shows-age',
  templateUrl: './shows-age.component.html',
  styleUrls: ['./shows-age.component.css']
})
export class ShowsAgeComponent implements OnInit {

  constructor(public promAdminService: PromAdminService,
  private sendMoviesService: SendMoviesService) {}

  @ViewChild(CustomDialogComponent) customDialog!: CustomDialogComponent;

  categories: string[] = ['Fantasía', 'Drama', 'Crimen', 'Acción', 'Documental', 'Aventura', 
    'Comedia', 'Musical', 'Animación', 'Terror', 'Superhéroes', 'Para Adultos', 
    'Romance', 'Ciencia Ficción', 'Hechos Reales', 'Infantil', 'Juvenil', 
    'Familiar'];  // Lista de categorías
  movies: string[] = ['Venom: El Último Baile', 'Guasón 2: Folie à Deux', 'Robot Salvaje', 'Un Panda en África',
  'Super Man: La Historia de Christopher Reeve', 'La Sustancia', 'Terrifier 3', 'De Noche con el Diablo', 
    'El Silencio de los Inocentes', 'Sonríe 2']; // Lista de películas

  ngOnInit(): void {
    this.sendMoviesService.setMovies(this.movies);
  }

  selectedCategories: string[] = [];
  selectedMovies: string[] = [];
  selectedCondition: string = '';
  showAgeSelector: boolean = false;
  showCustomModal = false;
  buttonTextFunciones: string = 'AGREGAR';
  buttonTextEdad: string = 'AGREGAR';

  funciones: string[] = [];
  edad: number | null = null;
  edades: { condition: string; value: number }[] = []
  mayoresEdad: number | null = null;
  menoresEdad: number | null = null;

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
    console.log("Funciones confirmadas:", this.funciones);
  }

  confirmEdades() {
    // Procesamos las funciones seleccionadas
    this.promAdminService.changeEdades(this.edades);
    console.log("Funciones confirmadas:", this.funciones);
  }

  toggleAgeSelector(): void {
    this.showAgeSelector = !this.showAgeSelector;
  
    if (!this.showAgeSelector) {
      this.edades = [];  // Limpiamos la lista de edades
    }
    this.buttonTextEdad = this.showAgeSelector ? 'QUITAR' : 'AGREGAR';
  }

  selectCondition(condition: string) {
    this.selectedCondition = condition;  // Establece la condición seleccionada
  }

  addEdad() {
    if (this.edad === null || this.edad <= 0 || this.selectedCondition === '') {
      return;
    }
    if (this.selectedCondition === 'mayores' && this.menoresEdad !== null && this.edad >= this.menoresEdad) {
      alert('La edad de "Mayores de" debe ser menor que la edad de "Menores de".');
      return;
    }
    if (this.selectedCondition === 'menores' && this.mayoresEdad !== null && this.edad <= this.mayoresEdad) {
      alert('La edad de "Menores de" debe ser mayor que la edad de "Mayores de".');
      return;
    }

    const conditionText = this.selectedCondition === 'mayores'
                          ? `Mayores de ${this.edad} años`
                          : `Menores de ${this.edad} años`;
  
    if (this.selectedCondition === 'mayores' && this.edades.some(a => a.condition.includes("Mayores de"))) {
      alert('Ya existe un rango de "Mayores de" en la lista.');
      return;
    }
    if (this.selectedCondition === 'menores' && this.edades.some(a => a.condition.includes("Menores de"))) {
      alert('Ya existe un rango de "Menores de" en la lista.');
      return;
    }
    // Reemplazar el valor existente si ya hay uno con la misma condición
    const index = this.edades.findIndex(a => a.condition.includes(this.selectedCondition));
    if (index !== -1) {
      // Si ya existe, reemplazar
      this.edades[index] = { condition: conditionText, value: this.edad };
    } else {
      // Si no existe, añadir nueva condición
      this.edades.push({ condition: conditionText, value: this.edad });
    }
  
    // Actualizar los valores de mayores y menores
    if (this.selectedCondition === 'mayores') {
      this.mayoresEdad = this.edad;
    } else if (this.selectedCondition === 'menores') {
      this.menoresEdad = this.edad;
    }
  
    // Ordenar las edades, asegurando que "Mayores de" siempre aparezca primero
    this.edades.sort((a, b) => {
      if (a.condition.includes("Mayores de") && !b.condition.includes("Mayores de")) {
        return -1; // "Mayores de" siempre viene primero
      }
      if (!a.condition.includes("Mayores de") && b.condition.includes("Mayores de")) {
        return 1;  // "Mayores de" siempre viene primero
      }
      return 0;  // No cambiar el orden si son iguales
    });
  
    // Limpiar los valores para el siguiente rango
    this.edad = null;
    this.selectedCondition = ''; 
  }

  removeEdad(index: number) {
    const removed = this.edades.splice(index, 1)[0];
    
    if (removed.condition.includes('Mayores de')) {
      this.mayoresEdad = null;
    } else if (removed.condition.includes('Menores de')) {
      this.menoresEdad = null;
    }
  }
}
