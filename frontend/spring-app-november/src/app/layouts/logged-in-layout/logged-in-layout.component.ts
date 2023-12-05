import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-logged-in-layout',
  templateUrl: './logged-in-layout.component.html',
  styleUrls: ['./logged-in-layout.component.css'],
})
export class LoggedInLayoutComponent {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
}
