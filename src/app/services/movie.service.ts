import { Injectable } from '@angular/core';
import { Movie } from '../_models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  protected movieList: Movie[] = [
    {
      name: 'Inception',
      sinopsis:
        'A thief who infiltrates the subconscious to steal secrets finds himself in a dangerous mission.',
      duracion: 148,
      photo: 'https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg',
      trailer: 'https://www.youtube.com/embed/YoHD9XEInc0',
    },
    {
      name: 'The Shawshank Redemption',
      sinopsis:
        'Two imprisoned men bond over years, finding solace and redemption through acts of decency.',
      duracion: 142,
      photo: 'https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg',
      trailer: 'https://www.youtube.com/embed/6hB3S9bIaco',
    },
    {
      name: 'The Godfather',
      sinopsis:
        'The patriarch of an organized crime dynasty transfers control to his reluctant son.',
      duracion: 175,
      photo: 'https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_.jpg',
      trailer: 'https://www.youtube.com/embed/sY1S34973zA',
    },
    {
      name: 'The Dark Knight',
      sinopsis:
        'Batman faces the Joker, a criminal mastermind who wants to bring Gotham to chaos.',
      duracion: 152,
      photo:
        'https://images.moviesanywhere.com/bd47f9b7d090170d79b3085804075d41/c6140695-a35f-46e2-adb7-45ed829fc0c0.jpg',
      trailer: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    },
    {
      name: 'Pulp Fiction',
      sinopsis:
        'The lives of two mob hitmen, a boxer, and others intertwine in a series of incidents.',
      duracion: 154,
      photo:
        'https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_.jpg',
      trailer: 'https://www.youtube.com/embed/s7EdQ4FqbhY',
    },
    {
      name: "Schindler's List",
      sinopsis:
        'A businessman saves thousands of Jewish refugees during the Holocaust by employing them in his factories.',
      duracion: 195,
      photo:
        'https://m.media-amazon.com/images/M/MV5BNjM1ZDQxYWUtMzQyZS00MTE1LWJmZGYtNGUyNTdlYjM3ZmVmXkEyXkFqcGc@._V1_.jpg',
      trailer: 'https://www.youtube.com/embed/gG22XNhtnoY',
    },
    {
      name: 'Forrest Gump',
      sinopsis:
        'The life journey of a simple man with a low IQ, who accidentally influences historical events.',
      duracion: 142,
      photo:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcScf5su68o8oOp0D89ESlb3_8RW2ge3ZWIPFv_OBVSObb680o3H',
      trailer: 'https://www.youtube.com/embed/bLvqoHBptjg',
    },
    {
      name: 'Fight Club',
      sinopsis:
        'An insomniac and a soap salesman create an underground fight club that spirals out of control.',
      duracion: 139,
      photo:
        'https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      trailer: 'https://www.youtube.com/embed/qtRKdVHc-cE',
    },
    {
      name: 'Interstellar',
      sinopsis:
        "A team of explorers travel through a wormhole in space to ensure humanity's survival.",
      duracion: 169,
      photo: 'https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg',
      trailer: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    },
    {
      name: 'The Matrix',
      sinopsis:
        'A computer hacker learns the shocking truth about his world and joins a rebellion.',
      duracion: 136,
      photo: 'https://m.media-amazon.com/images/I/51EG732BV3L.jpg',
      trailer: 'https://www.youtube.com/embed/vKQi3bBA1y8',
    },
    {
      name: 'Venom: El Último Baile',
      sinopsis:
        'En Venom: El último baile, Tom Hardy regresa como Venom, uno de los personajes más grandes y complejos de Marvel, para la última película de la trilogía.',
      duracion: 110,
      photo:
        'https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_.jpg',
      trailer: 'https://www.youtube.com/embed/aFsGDcy-6hc',
    },
  ];

  constructor() {}

  getMovieList(): Movie[] {
    return this.movieList;
  }

  getMovieByName(name: string): Movie | undefined {
    return this.movieList.find((Movie) => Movie.name === name);
  }
}
