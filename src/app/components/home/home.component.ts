import { Component, inject } from '@angular/core';
import { Movie } from 'src/app/_models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/_models/user';
import { Role } from 'src/app/_models/role';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  user?: User | null;

  movieService: MovieService = inject(MovieService);
  movieListingList: Movie[] = [];
  carouselMoviesList: Movie[] = [];
  constructor() {
    this.movieListingList = this.movieService.getMovieList();
    this.carouselMoviesList = this.movieService.filterMovies('Drama');
  }

  get isAdmin() {
    return this.user?.role === Role.Admin;
  }
}
