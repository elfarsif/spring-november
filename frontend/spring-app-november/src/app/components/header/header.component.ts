import { Component, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  username!: string;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
  logout() {
    this.authService.logout();
  }
  ngOnInit() {
    this.username = this.cookieService.get('username');
  }
}
