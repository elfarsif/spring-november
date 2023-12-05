import { Component } from '@angular/core';
import { RecipeDTO } from 'src/app/models/recipe-dto.model';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-card-list',
  templateUrl: './recipe-card-list.component.html',
  styleUrls: ['./recipe-card-list.component.css'],
})
export class RecipeCardListComponent {
  items = [
    { title: 'Card 1', link: '/content-page/card1' },
    { title: 'Card 2', link: '/content-page/card2' },
    { title: 'Card 3', link: '/content-page/card1' },
    { title: 'Card 4', link: '/content-page/card2' },
  ];
  recipes!: RecipeDTO[];
  constructor(private recipeService: RecipeService) {}
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
}
