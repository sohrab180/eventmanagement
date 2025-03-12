import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'http://localhost:3000/api/v1/users/login';
  private apiUrl = 'https://eventmanagement-backend-kro5vwm9z-sohrab180s-projects.vercel.app/api/v1/users/login';
  
  private authState = new BehaviorSubject<boolean>(false);
  authState$ = this.authState.asObservable();

  private userSubject = new BehaviorSubject<any>(null); // 🔥 Tracks user details
  userStatus = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const tokenExists = !!localStorage.getItem('token');
      this.authState.next(tokenExists);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.userSubject.next(JSON.parse(storedUser)); // ✅ Load user on startup
      }
    }
  }

  // ✅ Login function with user state update
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap((response) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.authState.next(true);
          this.userSubject.next(response.user); // 🔥 Emit user details
        }
      })
    );
  }

  // ✅ Check if user is logged in
  isLoggedIn(): boolean {
    return this.authState.value;
  }

  // ✅ Get stored token
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // ✅ Get user details dynamically
  getUser(): any {
    return this.userSubject.value;
  }

  // ✅ Logout function with cleanup
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.authState.next(false);
    this.userSubject.next(null); // 🔥 Clear user data
  }
}
