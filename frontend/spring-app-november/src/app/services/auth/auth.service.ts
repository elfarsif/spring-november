import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, throwError } from 'rxjs';
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
    return this.http
      .post<any>(`${this.apiUrl}/users/login`, { username, password })
      .pipe(
        map((response) => {
          this.cookieService.set('token', response.token);
          return response;
        }),
        catchError((error) => {
          console.error('Login failed', error);
          return throwError(error);
        })
      );
  }

  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['/login']); // Assuming '/login' is your login route
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }
}
