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
  showID: number | null = null;
  selectedShowTimeFuncion?: showTimeFuncion;
  formato: any;

  constructor(
    private seatService: SeatService,
    private funcionService: FunAdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movieName = this.route.snapshot.paramMap.get('name');
    this.route.queryParams.subscribe((params) => {
      this.time = params['time'];
      this.showID = +params['showID'];
      this.formato = params['formato'];
    });

    if (this.movieName && this.showID && this.time) {
      const funcion = this.funcionService.getFuncionById(this.showID);

      if (funcion) {
        this.selectedShowTimeFuncion = funcion.showSeats.find(
          (seat) => seat.showTime === this.time && seat.format === this.formato
        );
      }

      // Filter seats if the showTimeFuncion exists
      if (this.selectedShowTimeFuncion) {
        this.filterSeatsByRow(this.selectedShowTimeFuncion.matrixseats);
      }
    }
  }

  filterSeatsByRow(seats: Seat[][]): void {
    this.filteredSeats = {};
    this.rows.forEach((row) => {
      this.filteredSeats[row] = seats.flat().filter((seat) => seat.row === row);
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

    if (this.selectedShowTimeFuncion) {
      this.seatService.updateSeats(selectedSeats || []);
    }
  }
}
