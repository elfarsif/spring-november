import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(username: string, password: string) {
    if (username === 'user' && password === 'pass') {
      console.log('Logged in!');
      this.router.navigate(['/landing']);
    } else {
      console.error('Login failed');
    }
  }
}
