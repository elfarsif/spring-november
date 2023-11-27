import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  username!: string;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.username = this.cookieService.get('username');
  }

  logout() {
    this.authService.logout();
  }
}
