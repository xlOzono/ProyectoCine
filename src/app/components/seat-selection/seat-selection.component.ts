import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Seat } from 'src/app/_models/seat';
import { SeatService } from 'src/app/services/seat.service';
import { FunAdminService } from 'src/app/services/fun-admin.service';
import { Funcion } from 'src/app/_models/funcion';
import { showTimeFuncion } from 'src/app/_models/showTimeFuncion';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
})
export class SeatSelectionComponent implements OnInit, OnDestroy {
  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  filteredSeats: { [key: string]: Seat[] } = {};
  movieName: string | null = null;
  time: string | null = null;
  showID: number | null = null;
  selectedShowTimeFuncion?: showTimeFuncion;
  formato: any;

  private routeSub: Subscription | null = null;

  constructor(
    private seatService: SeatService,
    private funcionService: FunAdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to route changes
    this.routeSub = this.route.queryParams.subscribe((params) => {
      this.time = params['time'];
      this.formato = params['formato'];
      this.movieName = this.route.snapshot.paramMap.get('name');

      // Update the component state
      this.loadSeats();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.routeSub?.unsubscribe();
  }

  loadSeats(): void {
    if (this.movieName && this.time && this.formato) {
      console.log('Buscando funciones para la película:', this.movieName);

      // Obtener todas las funciones de la película
      const funciones = this.funcionService.getMovieFunciones(this.movieName);

      if (!funciones || funciones.length === 0) {
        console.error(
          'No se encontraron funciones para la película:',
          this.movieName
        );
        this.selectedShowTimeFuncion = undefined;
        this.filteredSeats = {};
        return;
      }

      console.log('Funciones encontradas:', funciones);

      // Buscar la función que coincida con el formato y el horario
      const funcionSeleccionada = funciones.find(
        (funcion) =>
          funcion.formato.toLowerCase() === this.formato.toLowerCase() &&
          funcion.showTimes.some((time) => time === this.time)
      );

      if (!funcionSeleccionada) {
        console.error(
          'No se encontró ninguna función con el formato y horario especificados:',
          {
            formato: this.formato,
            horario: this.time,
          }
        );
        this.selectedShowTimeFuncion = undefined;
        this.filteredSeats = {};
        return;
      }

      console.log('Función seleccionada:', funcionSeleccionada);

      // Buscar el showTimeFuncion correspondiente al horario
      this.selectedShowTimeFuncion = funcionSeleccionada.showSeats.find(
        (showTimeFuncion) => showTimeFuncion.showTime === this.time
      );

      if (!this.selectedShowTimeFuncion) {
        console.error(
          'No se encontró showTimeFuncion para el horario:',
          this.time
        );
        this.filteredSeats = {};
        return;
      }

      console.log(
        'showTimeFuncion seleccionada:',
        this.selectedShowTimeFuncion
      );

      // Filtrar y organizar los asientos por fila
      this.filterSeatsByRow(this.selectedShowTimeFuncion.matrixseats);
      console.log('Asientos filtrados por fila:', this.filteredSeats);
    } else {
      console.error('Faltan parámetros requeridos: movieName, time o formato.');
      this.filteredSeats = {}; // Limpiar los asientos si los parámetros son inválidos
    }
  }

  filterSeatsByRow(seats: Seat[][]): void {
    console.log('Filtering seats by row...');
    this.filteredSeats = {};
    this.rows.forEach((row) => {
      this.filteredSeats[row] = seats.flat().filter((seat) => seat.row === row);
    });
    console.log('Filtered seat matrix:', this.filteredSeats);
  }

  onSeatClick(seat: Seat): void {
    console.log('Seat clicked:', seat);
    if (seat.state === 'available') {
      seat.state = 'selected';
    } else if (seat.state === 'selected') {
      seat.state = 'available';
    }
    console.log('Updated seat state:', seat);
  }

  confirmSelection(): void {
    const selectedSeats = this.selectedShowTimeFuncion?.matrixseats
      .flat()
      .filter((seat) => seat.state === 'selected');

    if (!selectedSeats || selectedSeats.length === 0) {
      alert('No ha seleccionado ningún asiento.');
      console.warn('No seats selected.');
      return;
    }

    // Convertir los asientos seleccionados a formato string (e.g., "A1, B3")
    const seatStrings = selectedSeats.map(
      (seat) => `${seat.row}${seat.column}`
    );
    console.log('Asientos seleccionados:', seatStrings);

    // Actualizar el estado de los asientos seleccionados
    selectedSeats.forEach((seat) => {
      seat.state = 'unavailable'; // Cambiar el estado a "no disponible"
    });

    console.log('Seats after marking as unavailable:', selectedSeats);

    // Guardar el estado actualizado de los asientos
    if (this.selectedShowTimeFuncion) {
      this.seatService.updateSeats(selectedSeats);

      const funcion = this.funcionService
        .getMovieFunciones(this.movieName || '')
        .find((funcion) =>
          funcion.showSeats.includes(this.selectedShowTimeFuncion!)
        );

      if (funcion) {
        // Calcular el precio total
        const totalPrice = selectedSeats.length * funcion.precio;
        console.log('Precio total calculado:', totalPrice);

        // Navegar a la sección de compra con los parámetros necesarios
        this.router
          .navigate(['/purchase'], {
            queryParams: {
              seats: seatStrings.join(','), // Asientos seleccionados como string
              price: totalPrice, // Precio total calculado
              date: funcion.showDay.toISOString().split('T')[0], // Fecha en formato yyyy-MM-dd
              time: this.time, // Hora de la función
              auditorium: this.time?.split('|')[1]?.trim(), // Sala
              movie: this.movieName, // Nombre de la película
              idioma: funcion.opcionIdioma, // Idioma de la función
              format: funcion.formato, // Formato de la función
            },
          })
          .then((success) => {
            if (success) {
              alert('Asientos confirmados con éxito.');
              console.log('Navegación exitosa a /purchase');
            } else {
              console.error('Navegación fallida a /purchase');
            }
          })
          .catch((error) => {
            console.error('Error durante la navegación:', error);
          });
      } else {
        alert('Hubo un problema al procesar la función.');
        console.error('No se pudo encontrar la función seleccionada.');
      }
    } else {
      alert('Hubo un problema al confirmar los asientos. Intente nuevamente.');
      console.error('SelectedShowTimeFuncion no está definido.');
    }
  }
}
