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
    if (this.movieName) {
      sessionStorage.setItem('fromExistingMovie', 'true');
      // Navigate to details page for editing existing movie shows
      this.router.navigate([`/add-shows/${this.movieName}`]);
    } else {
      sessionStorage.setItem('fromAddMovie', 'true');
      // Navigate to add new movie shows
      this.router.navigate(['/add-shows']);
    }
  }
}
