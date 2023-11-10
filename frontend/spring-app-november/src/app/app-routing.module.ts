import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AuthGuard } from './guards/auth.guard';
import { VariationPageComponent } from './pages/variation-page/variation-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: 'landing',
    component: LandingPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'variations/:id',
    component: VariationPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
