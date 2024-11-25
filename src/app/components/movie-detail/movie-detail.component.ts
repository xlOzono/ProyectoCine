import { Component, inject, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/_models/movie';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Funcion } from 'src/app/_models/funcion';
import { FunAdminService } from 'src/app/services/fun-admin.service';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/_models/user';
import { Role } from 'src/app/_models/role';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent {
  user?: User | null;

  route: ActivatedRoute = inject(ActivatedRoute);
  movieService = inject(MovieService);
  funcionService = inject(FunAdminService);
  userService = inject(AccountService)
  movieListing: Movie | undefined;
  sanitizedTrailerUrl!: SafeResourceUrl;
  movieFunciones: Funcion[] = []; // All functions for the movie
  selectedDate: Date | null = null; // Selected date for filtering

  constructor(private sanitizer: DomSanitizer, private accountService: AccountService) {
    const movieName = String(this.route.snapshot.params['name']);
    this.accountService.user.subscribe((x) => (this.user = x));
    this.movieListing = this.movieService.getMovieByName(movieName);
  }

  ngOnInit(): void {
    // Sanitize the trailer URL
    if (this.movieListing?.trailer) {
      this.sanitizedTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.movieListing.trailer
      );
    }
  }

  get isAdmin() {
    return this.user?.role === Role.Admin;
  }

  
}
