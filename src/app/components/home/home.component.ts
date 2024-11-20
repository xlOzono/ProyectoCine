import { Component, inject } from '@angular/core';
import { Movie } from 'src/app/_models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  movieService: MovieService = inject(MovieService);
  movieListingList: Movie[] = [];
  carouselMoviesList: Movie[] = [];
  constructor() {
    this.movieListingList = this.movieService.getMovieList();
    this.carouselMoviesList = this.movieService.filterMovies('Drama');
  }
}
