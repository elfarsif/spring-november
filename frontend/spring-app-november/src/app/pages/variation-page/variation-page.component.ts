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
    this.selectedVariation = variation;
  }

  closePopup(): void {
    this.showModal = false;
  }
  openPopup(): void {
    this.showModal = true;
  }
  openEditPopup(): void {
    this.showEditModal = true;
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
    console.log('update variation title to ' + this.newVariationTitle);
  }
  private refreshCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
