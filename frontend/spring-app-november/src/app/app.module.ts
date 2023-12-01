import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { VariationPageComponent } from './pages/variation-page/variation-page.component';
import { TextComparisonComponent } from './components/text-comparison/text-comparison/text-comparison.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { DiffCheckerComponent } from './components/diff-checker/diff-checker.component';
import { BranchDropdownComponent } from './components/branch-dropdown/branch-dropdown.component';
import { CommitPageComponent } from './pages/commit-page/commit-page.component';
import { RepositoryPageComponent } from './pages/repository-page/repository-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LandingPageComponent,
    RecipeListComponent,
    VariationPageComponent,
    TextComparisonComponent,
    DiffCheckerComponent,
    BranchDropdownComponent,
    CommitPageComponent,
    RepositoryPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
