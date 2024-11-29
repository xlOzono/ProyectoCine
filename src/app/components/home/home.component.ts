import { Component } from '@angular/core';
import { Movie } from 'src/app/_models/movie';
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
 
  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }
 
  get isAdmin() {
    return this.user?.role === Role.Admin;
  }

  movieListingList: Movie[] = [{
    name: "Inception",
    sinopsis: "A thief who infiltrates the subconscious to steal secrets finds himself in a dangerous mission.",
    duracion: 148,
    photo: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg"
  },
  {
    name: "The Shawshank Redemption",
    sinopsis: "Two imprisoned men bond over years, finding solace and redemption through acts of decency.",
    duracion: 142,
    photo: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg"
  },
  {
    name: "The Godfather",
    sinopsis: "The patriarch of an organized crime dynasty transfers control to his reluctant son.",
    duracion: 175,
    photo: "https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_.jpg"
  },
  {
    name: "The Dark Knight",
    sinopsis: "Batman faces the Joker, a criminal mastermind who wants to bring Gotham to chaos.",
    duracion: 152,
    photo: "https://images.moviesanywhere.com/bd47f9b7d090170d79b3085804075d41/c6140695-a35f-46e2-adb7-45ed829fc0c0.jpg"
  },
  {
    name: "Pulp Fiction",
    sinopsis: "The lives of two mob hitmen, a boxer, and others intertwine in a series of incidents.",
    duracion: 154,
    photo: "https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_.jpg"
  },
  {
    name: "Schindler's List",
    sinopsis: "A businessman saves thousands of Jewish refugees during the Holocaust by employing them in his factories.",
    duracion: 195,
    photo: "https://m.media-amazon.com/images/M/MV5BNjM1ZDQxYWUtMzQyZS00MTE1LWJmZGYtNGUyNTdlYjM3ZmVmXkEyXkFqcGc@._V1_.jpg"
  },
  {
    name: "Forrest Gump",
    sinopsis: "The life journey of a simple man with a low IQ, who accidentally influences historical events.",
    duracion: 142,
    photo: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcScf5su68o8oOp0D89ESlb3_8RW2ge3ZWIPFv_OBVSObb680o3H"
  },
  {
    name: "Fight Club",
    sinopsis: "An insomniac and a soap salesman create an underground fight club that spirals out of control.",
    duracion: 139,
    photo: "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  },
  {
    name: "Interstellar",
    sinopsis: "A team of explorers travel through a wormhole in space to ensure humanity's survival.",
    duracion: 169,
    photo: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg"
  },
  {
    name: "The Matrix",
    sinopsis: "A computer hacker learns the shocking truth about his world and joins a rebellion.",
    duracion: 136,
    photo: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg"
  },
  {
    name: "Gladiator",
    sinopsis: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.",
    duracion: 155,
    photo: "https://m.media-amazon.com/images/M/MV5BYWQ4YmNjYjEtOWE1Zi00Y2U4LWI4NTAtMTU0MjkxNWQ1ZmJiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  },
  {
    name: "Titanic",
    sinopsis: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious R.M.S. Titanic.",
    duracion: 195,
    photo: "https://m.media-amazon.com/images/M/MV5BYTAyOTE3MjItODljMi00ZjhjLTkyYmEtMTkzOGE1YzgzMjg0XkEyXkFqcGc@._V1_.jpg"
  },
  {
    name: "The Lord of the Rings: The Fellowship of the Ring",
    sinopsis: "A young hobbit and his friends embark on a journey to destroy the One Ring and save Middle-earth.",
    duracion: 178,
    photo: "https://m.media-amazon.com/images/I/51Qvs9i5a%2BL._AC_.jpg"
  },
  {
    name: "Jurassic Park",
    sinopsis: "During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
    duracion: 127,
    photo: "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_FMjpg_UX1000_.jpg"
  },
  {
    name: "The Lion King",
    sinopsis: "A lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    duracion: 88,
    photo: "https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_.jpg"
  },
  {
    name: "Avatar",
    sinopsis: "A paraplegic Marine is sent to Pandora on a unique mission and becomes torn between following orders and protecting the alien world.",
    duracion: 162,
    photo: "https://m.media-amazon.com/images/I/41kTVLeW1CL._AC_.jpg"
  },
  {
    name: "Avengers: Endgame",
    sinopsis: "The Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    duracion: 181,
    photo: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg"
  },
  {
    name: "The Silence of the Lambs",
    sinopsis: "A young FBI cadet seeks the help of an imprisoned cannibal killer to catch another serial killer.",
    duracion: 118,
    photo: "https://m.media-amazon.com/images/M/MV5BNDdhOGJhYzctYzYwZC00YmI2LWI0MjctYjg4ODdlMDExYjBlXkEyXkFqcGc@._V1_.jpg"
  },
  {
    name: "The Green Mile",
    sinopsis: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    duracion: 189,
    photo: "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_FMjpg_UX1000_.jpg"
  },
  {
    name: "Braveheart",
    sinopsis: "Scottish warrior William Wallace leads his countrymen in a rebellion to free his homeland from the tyranny of King Edward I of England.",
    duracion: 178,
    photo: "https://m.media-amazon.com/images/M/MV5BNGMxZDBhNGQtYTZlNi00N2UzLWI4NDEtNmUzNWM2NTdmZDA0XkEyXkFqcGc@._V1_.jpg"
  }];
  
}
