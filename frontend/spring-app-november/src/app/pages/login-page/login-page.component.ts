import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user-dto.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  username!: string;
  password!: string;

  showRegisterModal: boolean = false;
  newUserUsername!: string;
  newUserPassword!: string;
  newUserEmail!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (data) => {
        const userId = this.getUserIdFromToken(data.token);
        if (userId != null) {
          const userIdStr = userId.toString();
          console.log('Logged in!', data);
          this.cookieService.set('userId', userIdStr);
        } else {
          console.error('User ID not found in token');
        }
        this.router.navigate(['/landing']);
      },
      (error) => {
        console.error('Login error', error);
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

  openRegisterPopup(): void {
    this.showRegisterModal = true;
  }

  closeRegisterPopup(): void {
    this.showRegisterModal = false;
  }

  registerNewUser(): void {
    this.authService
      .postNewUser(
        this.newUserUsername,
        this.newUserPassword,
        this.newUserEmail
      )
      .subscribe(
        (data) => {
          console.log('User registered', data);
          this.closeRegisterPopup();
        },
        (error) => {
          console.error('Error registering user', error);
        }
      );
  }
}
