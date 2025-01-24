import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private user = { email: 'test@example.com', password: '123456' };

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    if (email === this.user.email && password === this.user.password) {
      this.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAuthenticated', 'true');
      }
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (typeof window === 'undefined') {
      return false; 
    }
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}
