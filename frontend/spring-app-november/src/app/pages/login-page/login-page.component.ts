import { Component } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (data) => {
        console.log('Logged in!', data);
        // Redirect to landing page or perform other actions after successful login
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }
}
