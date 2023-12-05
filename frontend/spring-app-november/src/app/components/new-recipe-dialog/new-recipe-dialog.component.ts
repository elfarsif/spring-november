import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-new-recipe-dialog',
  templateUrl: './new-recipe-dialog.component.html',
  styleUrls: ['./new-recipe-dialog.component.css'],
})
export class NewRecipeDialogComponent {
  newRecipeTitle!: string;
  constructor(
    private dialogRef: MatDialogRef<NewRecipeDialogComponent>,
    private cookieService: CookieService,
    private recipeService: RecipeService,
    private router: Router
  ) {}
  close(): void {
    this.dialogRef.close();
  }
  submitNewRecipe() {
    console.log('submit new recipe');
    const userId = +this.cookieService.get('userId');
    this.recipeService.postNewRecipe(this.newRecipeTitle, userId).subscribe(
      (data) => {
        console.log('Recipe Created ' + data);
        //also add a default variation for functionality
        this.refreshCurrentRoute();
        this.close();
      },
      (error) => {
        console.error('Error in creating variation', error);
      }
    );
  }

  private refreshCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
