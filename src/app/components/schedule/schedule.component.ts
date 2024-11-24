import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  constructor(private router: Router) {}
  
  navigateToShowtimes(){
    sessionStorage.setItem('fromAddMovie', 'true');
    this.router.navigate(['/add-shows']);
  }
}
