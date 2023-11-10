import { Component } from '@angular/core';
import { RecipeDTO } from 'src/app/models/recipe-dto.model';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes!: RecipeDTO[];
  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {
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
}
