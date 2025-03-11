import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-view-eventmanagement-dialog',
  standalone: true,
  imports: [
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatTooltipModule,
      ReactiveFormsModule,
      CommonModule,
      MatCardModule
    ],
  templateUrl: './view-eventmanagement-dialog.component.html',
  styleUrl: './view-eventmanagement-dialog.component.scss'
})
export class ViewEventmanagementDialogComponent {
  viewEventData:any
  constructor(private route: ActivatedRoute) {}

    ngOnInit() {
      // Initialize the form before using it
      this.route.queryParams.subscribe(params => {
  
        // Clone the params object and format the date correctly
        let eventData = { ...params };
  
        if (eventData['date']) {
          eventData['date'] = new Date(eventData['date']).toISOString().split('T')[0]; // Format YYYY-MM-DD
        }
  
        this.viewEventData=eventData; 
      });
    }
    

}
