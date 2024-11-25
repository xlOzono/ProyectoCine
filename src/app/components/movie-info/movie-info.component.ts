import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/_models/movie';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent {
  form!: FormGroup;
  submitted = false;
  tempMovie: Movie | null = null;
  sanitizedTrailerUrl: SafeResourceUrl | null = null;

  constructor(private formBuilder: FormBuilder, private movieService: MovieService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      sinopsis: ['', Validators.required],
      duration: ['', Validators.required],
      genre: ['', Validators.required],
      photo: ['', Validators.required],
      carouselPhoto: ['', Validators.required],
      trailer: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }
  addInfoMovie(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.tempMovie = {
      name: this.f.name.value,
      sinopsis: this.f.sinopsis.value,
      duration: parseInt(this.f.duration.value, 10),
      genre: this.f.genre.value,
      photo: this.f.photo.value,
      carouselPhoto: this.f.carouselPhoto.value,
      trailer: this.f.trailer.value,
    };
    this.sanitizedTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.tempMovie.trailer);
  }

  publishMovie(): void {
    if (this.tempMovie) {
      const existingMovie = this.movieService.getMovieByName(this.tempMovie.name);
      if (existingMovie) {
        return;
      }
      this.movieService.addMovie(this.tempMovie);
    }
  }
}
