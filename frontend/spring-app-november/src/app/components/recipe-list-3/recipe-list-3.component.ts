import { Component } from '@angular/core';
import { RecipeDTO } from 'src/app/models/recipe-dto.model';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { NewRecipeDialogComponent } from '../new-recipe-dialog/new-recipe-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-list-3',
  templateUrl: './recipe-list-3.component.html',
  styleUrls: ['./recipe-list-3.component.css'],
})
export class RecipeList3Component {
  recipes!: RecipeDTO[];
  constructor(
    private recipeService: RecipeService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.loadRecipes();
  }
  loadRecipes() {
    this.recipeService.getRecipeByUsername().subscribe(
      (data) => {
        this.recipes = data;
        console.log(this.recipes);
      },
      (error) => {}
    );
  }
  openPopup(): void {
    const dialogRef = this.dialog.open(NewRecipeDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
