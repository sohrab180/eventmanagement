import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { EventManagementService } from '../../../service/eventmanagement.service';


@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ MatTableModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatTooltipModule,
      ReactiveFormsModule,
      CommonModule,],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  eventForm!:FormGroup
  alertMessage:any;
  alertType:any
  Id:any
  constructor(private route: ActivatedRoute,private router: Router,private fb: FormBuilder,private eventService:EventManagementService) {}

  ngOnInit() {
    // Initialize the form before using it
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', Validators.required],
      location: ['', [Validators.required, Validators.minLength(5)]],
    });
  
    this.route.queryParams.subscribe(params => {
      console.log("Received Event Data:", params);
      this.Id=params['id']; 
  
      // Clone the params object to avoid modifying the read-only object
      let eventData = { ...params };
  
      // Format the date before patching the form
      if (eventData['date']) {
        eventData['date'] = new Date(eventData['date']).toISOString().split('T')[0];
      }
  
      this.eventForm.patchValue(eventData); // Pre-fill form fields
    });
   
  }
  
  

getError(controlName: string): string {
  const control = this.eventForm.get(controlName);
  if (control?.hasError('required')) {
    return 'This field is required';
  }
  if (control?.hasError('minlength')) {
    return `Minimum ${control.errors?.['minlength'].requiredLength} characters required`;
  }
  return '';
}

updateForm() {
  if (this.eventForm.invalid) {
    this.alertMessage = '⚠️ Please fill in all required fields correctly!';
    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
    return;
  }

  this.eventService.updateEvent(this.Id, this.eventForm.value).subscribe({
    next: (response) => {
      console.log("Update successful:", response);
      this.alertMessage = '✅ Event updated successfully!';
      this.alertType = 'success';
      
      setTimeout(() => {
        this.alertMessage = ''; // Hide alert
        this.router.navigate(['/dashboard']); // Navigate after success
      }, 1000);
    },
    error: (err) => {
      console.error("Update failed:", err);
      this.alertMessage = '❌ Failed to update event!';
      
      setTimeout(() => {
        this.alertMessage = ''; // Hide alert after 3s
      }, 3000);
    }
  });
}

}
