import { Component, OnInit } from '@angular/core';
import { Seat } from 'src/app/_models/seat';
import { SeatService } from 'src/app/services/seat.service';
@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {
  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  seats!: Seat[];
  filteredSeats: { [key: string]: Seat[] } = {

  };
  
  constructor(private seatService: SeatService){}
  
  ngOnInit(): void {
      this.seatService.getSeats().subscribe((seats)=> (this.seats = seats));
      this.filterSeatsByRow();
    }
    
    filterSeatsByRow(): void {
      this.filteredSeats = {}; // Reiniciar el mapa de asientos filtrados
      this.rows.forEach((row) => {
        this.filteredSeats[row] = this.seats.filter((seat) => seat.row === row);
      });
    }

  onSeatClick(seat:Seat): void {
    if(seat.state === 'available'){
      seat.state = 'selected';
    }else if(seat.state === 'selected'){
      seat.state = 'available';
   }  
  }

  confirmSelection(): void {
    const selectedSeats = this.seats.filter((seat) => seat.state === 'selected');
    console.log('Asientos seleccionados:', selectedSeats);
    this.seatService.updateSeats(this.seats); // Guardar cambios
  }
}
