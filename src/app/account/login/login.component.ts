import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ MatInputModule,MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = 'sohrabali180@gmail.com';
  password = '123456';
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        alert('Login successful');
        this.router.navigate(['/dashboard']); // Redirect to dashboard after login
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed!';
      },
    });
  }
}
