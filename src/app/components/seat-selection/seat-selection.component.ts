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
    console.log('Confirming seat selection...');
    const selectedSeats = this.selectedShowTimeFuncion?.matrixseats
      .flat()
      .filter((seat) => seat.state === 'selected');

    if (!selectedSeats || selectedSeats.length === 0) {
      alert('No ha seleccionado ningún asiento.');
      console.warn('No seats selected.');
      return;
    }

    console.log('Selected seats:', selectedSeats);

    // Update the state of the selected seats
    selectedSeats.forEach((seat) => {
      seat.state = 'unavailable'; // Mark the seat as unavailable
    });

    console.log('Seats after marking as unavailable:', selectedSeats);

    // Persist the updated seat state in the service
    if (this.selectedShowTimeFuncion) {
      this.seatService.updateSeats(selectedSeats);
      alert('Asientos confirmados con éxito.');
      console.log('Seats successfully updated in SeatService.');
    } else {
      alert('Hubo un problema al confirmar los asientos. Intente nuevamente.');
      console.error(
        'Failed to confirm seats. SelectedShowTimeFuncion is undefined.'
      );
    }
  }
}
