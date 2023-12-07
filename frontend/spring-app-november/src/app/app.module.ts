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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NewRecipeDialogComponent } from './components/new-recipe-dialog/new-recipe-dialog.component';
import { NewVariationDialogComponent } from './components/dialog/new-variation-dialog/new-variation-dialog.component';
import { MaterialModule } from './modules/material/material.module';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { HeaderComponent } from './components/header/header.component';
import { MainContentPageComponent } from './pages/main-content-page/main-content-page.component';
import { LoggedInLayoutComponent } from './layouts/logged-in-layout/logged-in-layout.component';
import { AssignedPageComponent } from './layouts/assigned-page/assigned-page.component';
import { ContentPageComponent } from './layouts/content-page/content-page.component';
import { RecipeCardListComponent } from './components/recipe-card-list/recipe-card-list.component';
import { RecipeList3Component } from './components/recipe-list-3/recipe-list-3.component';
import { RecipeHeaderComponent } from './components/recipe-header/recipe-header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommitDialogComponent } from './components/dialog/commit-dialog/commit-dialog.component';

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
    NewRecipeDialogComponent,
    NewVariationDialogComponent,
    SignupPageComponent,
    HeaderComponent,
    MainContentPageComponent,
    LoggedInLayoutComponent,
    AssignedPageComponent,
    ContentPageComponent,
    RecipeCardListComponent,
    RecipeList3Component,
    RecipeHeaderComponent,
    CommitDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
    NoopAnimationsModule,
    MatDialogModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
