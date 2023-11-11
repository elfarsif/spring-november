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
        console.log('Logged in!', data);
        this.cookieService.set('userId', data.id);
        this.router.navigate(['/landing']);
      },
      (error) => {
        console.error('Login error', error);
      }
    );
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
