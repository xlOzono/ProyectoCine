import { Seat } from './seat';

export interface showTimeFuncion {
  showTime: string; // Time of the show
  format: string; // Format of the movie (e.g., "2D", "3D", "IMAX")
  matrixseats: Seat[][]; // Seat matrix for this showtime
}
