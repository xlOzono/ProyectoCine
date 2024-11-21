import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/_models/movie';
import { MovieShowService } from 'src/app/services/movie-show.service';


@Component({
  selector: 'app-movie-listing',
  templateUrl: './movie-listing.component.html',
  styleUrls: ['./movie-listing.component.css']
})
export class MovieListingComponent {
  @Input()  movieListing!: Movie
}