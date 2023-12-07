import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { VariationDTO } from 'src/app/models/variation-dto.model';
import { SharedService } from 'src/app/services/shared/shared.service';
import { VariationService } from 'src/app/services/variation/variation.service';
import { NewRecipeDialogComponent } from '../new-recipe-dialog/new-recipe-dialog.component';
import { NewVariationDialogComponent } from '../dialog/new-variation-dialog/new-variation-dialog.component';

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
  selectedVariationTitle!: string;

  constructor(
    private variationService: VariationService,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private sharedService: SharedService,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe((params) => {
      this.recipeId = +params['id'];
    });
    this.variationService.getVariationsByRecipeId(this.recipeId).subscribe(
      (data) => {
        this.variations = data;
        console.log(this.variations);
        // Set the default value to the first variation
        if (this.variations.length > 0) {
          this.selectedVariation = this.variations[0];
          this.selectedVariationTitle = this.selectedVariation.variationTitle;
          console.log(this.selectedVariation);
        }
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
    console.log('select variation', variation);
    this.isOpen = false;
    this.variationChange.emit(variation);
    this.sharedService.setSelectedVariation(variation);
  }

  revealBranchInput() {
    this.addBranchInput = !this.addBranchInput;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewVariationDialogComponent);

    // You can subscribe to events like after the dialog is closed
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
