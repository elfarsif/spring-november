import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';

@NgModule({
  declarations: [AppComponent, LoginPageComponent, LandingPageComponent, RecipeListComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
