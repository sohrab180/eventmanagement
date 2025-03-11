import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EventManagementService } from '../../../service/eventmanagement.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // ✅ Import here


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, MatIconModule, MatButtonModule, RouterLink, CommonModule,MatProgressSpinnerModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  eventsList: any;
  isLoading: boolean = true; 
  constructor(
    private eventService: EventManagementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.isLoading = true; 
    this.eventService.getAllEvents().subscribe({
      next: (response) => {
        this.eventsList = response.events;
        this.isLoading = false; 
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        this.isLoading = false; // ✅ Hide spinner on error
      },
    });
  }
  editEvent(event: any) {
    this.router.navigate(['dashboard/update-event'], {
      queryParams: {
        id: event._id,
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location,
      },
    });
  }

  viewEvent(event:any){
    this.router.navigate(['dashboard/view-event'], {
      queryParams: {
        id: event._id,
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location,
      },
    });
  }

  deleteEvent(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService.deleteEvent(id).subscribe({
          next: (res) => {
            console.log('Deleted successfully:', res);
            Swal.fire('Deleted!', 'The event has been deleted.', 'success');
            this.getData()
          },
          error: (err) => {
            console.error('Delete failed:', err);
            Swal.fire('Error!', 'Failed to delete the event.', 'error');
          },
        });
      }
    });
  }

  
}
