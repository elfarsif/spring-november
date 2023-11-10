import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VariationDTO } from 'src/app/models/variation-dto.model';
import { VariationService } from 'src/app/services/variation/variation.service';

@Component({
  selector: 'app-variation-page',
  templateUrl: './variation-page.component.html',
  styleUrls: ['./variation-page.component.css'],
})
export class VariationPageComponent {
  variations!: VariationDTO[];
  recipeId!: number;
  selectedVariation?: VariationDTO;
  showModal: boolean = false;
  newVariationTitle: string = '';
  constructor(
    private variationService: VariationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.recipeId = +params['id'];
    });
    this.variationService.getVariationsByRecipeId(this.recipeId).subscribe(
      (data) => {
        this.variations = data;
        this.selectedVariation = this.variations[0];
        console.log(this.variations);
      },
      (error) => {}
    );
  }
  onSelectVariation(variation: VariationDTO): void {
    this.selectedVariation = variation;
  }

  closePopup(): void {
    this.showModal = false;
  }
  openPopup(): void {
    this.showModal = true;
  }
  submitNewVariation() {
    this.showModal = true;
    const recipeId = this.variations[0].recipe.recipeId; // Assuming you have recipeId in your DTO
    const userId = this.variations[0].recipe.user.id; // Assuming you have userId in your DTO
    this.variationService
      .postNewVariation(this.newVariationTitle, recipeId, userId)
      .subscribe(
        (variation) => {
          console.log('Variation created:', variation);

          this.refreshCurrentRoute();
        },
        (error) => {
          console.error('Error creating variation:', error);
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
