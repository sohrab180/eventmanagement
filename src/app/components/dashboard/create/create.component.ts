import { Component, NgZone } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventManagementService } from '../../../service/eventmanagement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  eventForm!: FormGroup;
  eventsList: any;
  alertMessage:any;
  alertType:any
  constructor(
    private fb: FormBuilder,
    private eventService: EventManagementService,
    private router: Router, private ngZone: NgZone
  ) {}
  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', Validators.required],
      location: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  submitForm(): void {
    if (this.eventForm.valid) {
      console.log('Event Data:', this.eventForm.value);
  
      this.eventService.createEvent(this.eventForm.value).subscribe({
        next: (response) => {
          this.alertMessage = '✅ Event created successfully!';
          this.alertType = 'success';
          // Properly reset the form
          this.eventForm.reset({}, { emitEvent: false });
          this.eventForm.markAsPristine();
          this.eventForm.markAsUntouched();
  
          // Hide alert after 2 seconds & navigate to dashboard
          setTimeout(() => {
            this.alertMessage = ''; // Hide alert
  
            // Ensure navigation using NgZone
            this.ngZone.run(() => {
              this.router.navigate(['/dashboard']);
            });
          }, 1000);
        },
        error: (err) => {
          this.alertMessage = '❌ Failed to create event!';
          this.alertType = 'danger';
  
          // Hide alert after 3 seconds
          setTimeout(() => {
            this.alertMessage = '';
          }, 3000);
        }
      });
    } else {
      this.eventForm.markAllAsTouched(); // Show validation errors if form is invalid
    }
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
}
