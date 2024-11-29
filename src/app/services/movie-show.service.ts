import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class MovieShowService {

  constructor(private router: Router)  {
  }
  navigateToMovie(movieName: string){
    const formattedName =movieName.replace(/\s+/g, '-').toLowerCase();
    this.router.navigate(['/cinema-show-admin/${formattedName}']);  
  }
}
