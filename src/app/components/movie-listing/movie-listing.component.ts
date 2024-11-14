import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/_models/movie';

@Component({
  selector: 'app-movie-listing',
  templateUrl: './movie-listing.component.html',
  styleUrls: ['./movie-listing.component.css'],
})
export class MovieListingComponent {
  @Input() movieListing!: Movie;
}
