import { Component, inject, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/_models/movie';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  movieService = inject(MovieService);
  movieListing: Movie | undefined;
  sanitizedTrailerUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    const movieName = String(this.route.snapshot.params['name']);
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
}
