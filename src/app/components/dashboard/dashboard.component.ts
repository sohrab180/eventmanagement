import { Component, Inject, PLATFORM_ID,ChangeDetectionStrategy, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventManagementService } from '../../service/eventmanagement.service';
import { CommonModule, formatDate } from '@angular/common';

// import * as bootstrap from 'bootstrap';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
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
    MatDialogModule,
    RouterOutlet,
    RouterLink,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
 
})
export class DashboardComponent {

  
  signOut() {
    // Implement sign-out logic (clear token, redirect, etc.)
    console.log("User signed out");
  }
  



}
