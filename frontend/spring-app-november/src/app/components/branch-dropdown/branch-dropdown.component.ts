import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { VariationDTO } from 'src/app/models/variation-dto.model';
import { VariationService } from 'src/app/services/variation/variation.service';

@Component({
  selector: 'app-branch-dropdown',
  templateUrl: './branch-dropdown.component.html',
  styleUrls: ['./branch-dropdown.component.css'],
})
export class BranchDropdownComponent {
  recipeId!: number;
  variations!: VariationDTO[];
  addBranchInput: boolean = false;
  newBranchName!: string;

  constructor(
    private variationService: VariationService,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {
    this.route.params.subscribe((params) => {
      this.recipeId = +params['id'];
    });
    this.variationService.getVariationsByRecipeId(this.recipeId).subscribe(
      (data) => {
        this.variations = data;
        console.log(this.variations);
      },
      (error) => {}
    );
  }

  @Output() variationChange = new EventEmitter<VariationDTO>();

  onVariationChange(event: any) {
    const selectedVariationId = event.target.value;
    const selectedVariation = this.variations.find(
      (variation) => variation.variationId === +selectedVariationId
    );
    this.variationChange.emit(selectedVariation);
  }

  isOpen = false;
  selectedVariation!: VariationDTO;
  // ... other properties

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectVariation(variation: VariationDTO) {
    this.selectedVariation = variation;
    this.isOpen = false;
    this.variationChange.emit(variation);
  }

  revealBranchInput() {
    this.addBranchInput = !this.addBranchInput;
  }

  addBranch() {
    console.log('adding');
    const userId = +this.cookieService.get('userId');
    this.variationService
      .postNewVariation(this.newBranchName, this.recipeId, userId, false)
      .subscribe(
        (variation) => {
          console.log('Variation created:', variation);
          this.addBranchInput = false;
        },
        (error) => {
          console.error('Error creating variation:', error);
        }
      );
  }
}
