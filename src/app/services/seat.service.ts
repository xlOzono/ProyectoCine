import { Injectable } from '@angular/core';
import { Seat } from '../_models/seat';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private seats: Seat[] = [];

  constructor() { 

    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    for (let row of rows) {
      for (let col = 1; col <= 10; col++) {
        this.seats.push({
          row,
          column: col,
          state: 'available', // Simular estados
        });
      }
    }
  }

  getSeats(): Observable<Seat[]> {
    return of (this.seats);
  }

  updateSeats(seats: Seat[]): void {
    this.seats = seats;
  }
}

