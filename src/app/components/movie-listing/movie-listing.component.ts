import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/_models/movie';

@Component({
  selector: 'app-movie-listing',
  templateUrl: './movie-listing.component.html',
  styleUrls: ['./movie-listing.component.css']
})
export class MovieListingComponent {
  @Input()  movieListing!: Movie

//para cada instancia del objeto movie se genera un direccion. 
  constructor(private router: Router){}

  createShow(movieName:string): void {this.router.navigate(['/cinema-show-admin',movieName]);};
}
