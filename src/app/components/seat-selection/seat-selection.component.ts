import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class SeatSelectionComponent implements OnInit {
  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  filteredSeats: { [key: string]: Seat[] } = {};
  movieName: string | null = null;
  time: string | null = null;
  date: string | null = null;
  showID: number | null = null;
  selectedShowTimeFuncion?: showTimeFuncion;

  constructor(
    private seatService: SeatService,
    private funcionService: FunAdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener parámetros de la ruta y consulta
    this.movieName = this.route.snapshot.paramMap.get('name');
    this.route.queryParams.subscribe((params) => {
      this.time = params['time'];
      this.date = params['date'];
      this.showID = +params['showID'];
    });

    // Filtrar función y showTimeFuncion según showID y time
    if (this.movieName && this.showID && this.time) {
      const funcion = this.funcionService.getFuncionById(this.showID);

      if (funcion) {
        this.selectedShowTimeFuncion = funcion.showSeats.find(
          (seat) => seat.showID === this.showID
        );
      }

      if (this.selectedShowTimeFuncion) {
        this.filterSeatsByRow(this.selectedShowTimeFuncion.matrixseats);
      }
    }
  }

  filterSeatsByRow(seats: Seat[][]): void {
    this.filteredSeats = {}; // Reiniciar el mapa de asientos filtrados
    this.rows.forEach((row) => {
      this.filteredSeats[row] = seats
        .flat() // Convertir matriz en lista plana
        .filter((seat) => seat.row === row);
    });
  }

  onSeatClick(seat: Seat): void {
    if (seat.state === 'available') {
      seat.state = 'selected';
    } else if (seat.state === 'selected') {
      seat.state = 'available';
    }
  }

  confirmSelection(): void {
    const selectedSeats = this.selectedShowTimeFuncion?.matrixseats
      .flat()
      .filter((seat) => seat.state === 'selected');
    console.log('Asientos seleccionados:', selectedSeats);

    // Actualiza el estado en el servicio si es necesario
    if (this.selectedShowTimeFuncion) {
      this.seatService.updateSeats(selectedSeats || []);
    }
  }
}
