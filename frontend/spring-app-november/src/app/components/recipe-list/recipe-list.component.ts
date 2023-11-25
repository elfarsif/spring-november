import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RecipeDTO } from 'src/app/models/recipe-dto.model';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { VariationService } from 'src/app/services/variation/variation.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes!: RecipeDTO[];
  selectedRecipe!: RecipeDTO;
  showModal: boolean = false;
  showEditModal: boolean = false;
  newRecipeTitle: string = '';
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private variationService: VariationService,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.loadRecipes();
  }
  navigateToVariations(recipeId: number) {
    this.router.navigate(['/variations', recipeId]);
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
  submitNewRecipe() {
    console.log('submit new recipe');
    const userId = +this.cookieService.get('userId');
    this.recipeService.postNewRecipe(this.newRecipeTitle, userId).subscribe(
      (data) => {
        console.log('Recipe Created ' + data);
        //also add a default variation for functionality
        this.refreshCurrentRoute();
      },
      (error) => {
        console.error('Error in creating variation', error);
      }
    );
  }
  onSelectVariation(variation: RecipeDTO): void {
    this.selectedRecipe = variation;
  }

  closePopup(): void {
    this.showModal = false;
  }
  openPopup(): void {
    this.showModal = true;
  }
  openEditPopup(recipe: RecipeDTO): void {
    this.showEditModal = true;
    this.selectedRecipe = recipe;
  }
  closeEditPopup() {
    this.showEditModal = false;
  }
  updateRecipeTitle() {
    console.log('Update reciope' + this.selectedRecipe.title);
    this.selectedRecipe.title = this.newRecipeTitle;
    this.recipeService.updateRecipe(this.selectedRecipe).subscribe(
      (response) => {
        console.log('Recipe updated:', response);
        this.refreshCurrentRoute();
      },
      (error) => {
        console.error('Error updating Recipe:', error);
      }
    );
  }

  removeRecipe(recipe: RecipeDTO) {
    this.recipeService.deleteRecipe(recipe.recipeId).subscribe(
      () => {
        console.log('Recipe deleted successfully');
        this.refreshCurrentRoute();
      },
      (error) => {
        console.error('Error deleting recipe', error);
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
