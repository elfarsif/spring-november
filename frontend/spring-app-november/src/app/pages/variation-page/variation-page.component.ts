import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  selectedVariationForEdit!: VariationDTO;
  showModal: boolean = false;
  showEditModal: boolean = false;
  newVariationTitle: string = '';
  constructor(
    private variationService: VariationService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
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
    this.selectedVariationForEdit = variation;
  }

  closePopup(): void {
    this.showModal = false;
  }
  openPopup(): void {
    this.showModal = true;
  }
  openEditPopup(variation: VariationDTO): void {
    this.showEditModal = true;
    this.selectedVariation = variation;
    console.log(this.selectedVariation.recipe.recipeId);
  }
  closeEditPopup(): void {
    this.showEditModal = false;
  }
  submitNewVariation() {
    this.showModal = true;
    const userId = +this.cookieService.get('userId');
    this.variationService
      .postNewVariation(this.newVariationTitle, this.recipeId, userId)
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
  updateVariationTitle() {
    console.log('update variation title to ' + this.selectedVariationForEdit);
    this.selectedVariationForEdit.variationTitle = this.newVariationTitle;
    this.variationService
      .updateVariation(this.selectedVariationForEdit)
      .subscribe(
        (response) => {
          console.log('Variation updated:', response);

          this.refreshCurrentRoute();
          // Handle the response
        },
        (error) => {
          console.error('Error updating variation:', error);
          // Handle the error
        }
      );
  }
  removeVariation(variation: VariationDTO) {
    this.variationService.deleteVariation(variation.variationId).subscribe(
      () => {
        console.log('Variation deleted successfully');
        this.refreshCurrentRoute();
      },
      (error) => {
        console.error('Error deleting variation', error);
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
