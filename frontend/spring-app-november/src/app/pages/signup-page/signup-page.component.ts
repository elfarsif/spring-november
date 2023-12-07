import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService
      .postNewUser(this.username, this.password, this.email)
      .subscribe(
        (data) => {
          console.log('Signed up :', data);
          this.authService.login(this.username, this.password).subscribe(
            (data) => {
              const userId = this.getUserIdFromToken(data.token);
              if (userId != null) {
                const userIdStr = userId.toString();
                console.log('Logged in!', data);
                this.cookieService.set('userId', userIdStr);
                this.cookieService.set('username', this.username);
              } else {
                console.error('User ID not found in token');
              }
              this.router.navigate(['/dashboard/landing']);
            },
            (error) => {
              console.error('Login error', error);
            }
          );
        },
        (error) => {
          console.error(error);
        }
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
