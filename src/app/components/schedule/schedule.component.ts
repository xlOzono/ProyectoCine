import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  @Input() movieName?: string; // Accept movieName as input to determine context
  
  constructor(private router: Router) {}
  
  navigateToShowtimes(): void {
    sessionStorage.setItem('fromAddMovie', 'true');
    
    if (this.movieName) {
      // Navigate to details page for editing existing movie shows
      this.router.navigate([`/add-shows/${this.movieName}`]);
    } else {
      // Navigate to add new movie shows
      this.router.navigate(['/add-shows']);
    }
  }
}
