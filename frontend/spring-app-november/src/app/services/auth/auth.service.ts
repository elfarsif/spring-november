import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user-dto.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient
  ) {}

  login(username: string, password: string) {
    if (username === 'user' && password === 'pass') {
      console.log('Logged in!');
      this.router.navigate(['/landing']);
    } else {
      console.error('Login failed');
    }
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}
