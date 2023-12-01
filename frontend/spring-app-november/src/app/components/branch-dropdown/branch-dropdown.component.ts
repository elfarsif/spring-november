import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private variationService: VariationService,
    private route: ActivatedRoute
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
}
