import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Import HttpClient
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule, FullCalendarModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular17';
  events: any[] = []; // Initialize events array

  // Inject HttpClient in the constructor
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch dynamic events from the web API
    this.http.get<any[]>('http://localhost/events.php').subscribe(data => {
      this.events = data; // Assign the response data to the events array
      console.log(this.events);
      
      // Update calendar options after fetching events
      this.calendarOptions.events = this.events; // Set events to calendar options
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [] // Initialize as an empty array
  };
}
