import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from 'src/app/models/user-dto.model';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl =
    'http://spring-6-env.eba-yauywiv3.us-east-2.elasticbeanstalk.com';
  user: User = {
    id: 0,
    username: '',
    email: 'some@gmail.com',
    password: '',
  };
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient,
    private sharedService: SharedService
  ) {}

  login(username: string, password: string) {
    return this.http
      .post<any>(`${this.apiUrl}/users/login`, { username, password })
      .pipe(
        map((response) => {
          this.cookieService.set('token', response.token);
          this.user.username = username;
          this.user.password = password;
          this.sharedService.setUser(this.user);
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

  postNewUser(username: string, password: string, email: string) {
    const payload = {
      username: username,
      password: password,
      email: email,
    };

    return this.http.post<any>(`${this.apiUrl}/users/register`, payload);
  }

  updateUser(user: User) {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const payload: User = user;
    return this.http.put<User>(
      `${this.apiUrl}/users/${this.getUserIdFromToken(token)}`,
      payload,
      { headers }
    );
  }

  getUserIdFromToken(token: string): number | null {
    try {
      const payload = token.split('.')[1]; // Get the payload part
      const decodedPayload = atob(payload); // Decode Base64
      const payloadObject = JSON.parse(decodedPayload);
      return payloadObject.userId; // Adjust depending on how the claim is named
    } catch (error) {
      console.error('Error parsing token', error);
      return null;
    }
  }
}
