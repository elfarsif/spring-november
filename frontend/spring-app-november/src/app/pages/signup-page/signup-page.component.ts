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

  onSubmit() {
    console.log(
      'Signup form submitted with:',
      this.username,
      this.password,
      this.email
    );
  }
}
