import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {



  isLoggedIn = false;
  userName = '';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authState$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    // ✅ Listen for user details changes
    this.authService.userStatus.subscribe((user) => {
      this.userName = user ? user.name : '';
    });
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
