export class Buy {
  cinema: string;
  movieName: string;
  date: string;
  auditorium: number;
  hour: string;
  seats: string[];
  price: number;
  tickets: string;

  constructor(
    cinema: string,
    movie_name: string,
    date: string,
    auditorium: number,
    hour: string,
    seats: string[],
    price: number,
    tickets: string
  ) {
    this.cinema = cinema;
    this.movieName = movie_name;
    this.date = date;
    this.auditorium = auditorium;
    this.hour = hour;
    this.seats = seats;
    this.price = price;
    this.tickets = tickets;
  }
}
