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
        console.log(this.variations);
      },
      (error) => {}
    );
  }
}
