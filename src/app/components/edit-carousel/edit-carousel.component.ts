import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/_models/movie';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-carousel',
  templateUrl: './edit-carousel.component.html',
  styleUrls: ['./edit-carousel.component.css']
})
export class EditCarouselComponent{


  constructor(
              private router: Router,
              public movieService: MovieService) {

              }

  ngOnInit(): void {
    this.movieService.carouselList = this.movieService.getCarouselList();
  }
  addMovieToCarusel(movie: Movie): void{
    this.movieService.addToCarousel(movie);
    this.movieService.carouselList = this.movieService.getCarouselList();
  }
  removeMovieFromCarousel(movieName: string): void{
    this.movieService.removeFromCarousel(movieName);
    this.movieService.getCarouselList();
  }
  
  isMovieSelected(movie:Movie): boolean{
    return this.movieService.carouselList.some(selected => selected.name === movie.name);
  }
  isMovieonList(movie:Movie): boolean{
    return this.movieService.copiaMovie.some(selected  => selected.name === movie.name);
  }

  showAlert(){
    
    for(let i = 0; i<this.movieService.carouselList.length; i ++)
      alert( 'se han añadido al carrusel: '+this.movieService.carouselList[i].name);
      this.router.navigate(['/'])

  }

}
