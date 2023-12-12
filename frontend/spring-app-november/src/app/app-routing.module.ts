import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AuthGuard } from './guards/auth.guard';
import { VariationPageComponent } from './pages/variation-page/variation-page.component';
import { CommitPageComponent } from './pages/commit-page/commit-page.component';
import { RepositoryPageComponent } from './pages/repository-page/repository-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoggedInLayoutComponent } from './layouts/logged-in-layout/logged-in-layout.component';
import { AssignedPageComponent } from './layouts/assigned-page/assigned-page.component';
import { ContentPageComponent } from './layouts/content-page/content-page.component';
import { AccountSettingPageComponent } from './pages/account-setting-page/account-setting-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  {
    path: 'landing',
    component: LandingPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'variations/:id',
    component: RepositoryPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'commits/:id',
    component: CommitPageComponent,
  },
  {
    path: 'dashboard',
    component: LoggedInLayoutComponent,
    children: [
      { path: 'assigned-page', component: AssignedPageComponent },
      { path: 'content-page', component: ContentPageComponent },
      { path: 'landing', component: LandingPageComponent },
      { path: 'variations/:id', component: RepositoryPageComponent },
      { path: 'commits/:id', component: CommitPageComponent },
      { path: 'account_settings', component: AccountSettingPageComponent },
      { path: '', redirectTo: 'assigned-page', pathMatch: 'full' },
    ],

    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
