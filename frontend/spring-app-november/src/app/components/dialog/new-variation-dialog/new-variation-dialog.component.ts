import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { VariationDTO } from 'src/app/models/variation-dto.model';
import { SharedService } from 'src/app/services/shared/shared.service';
import { VariationService } from 'src/app/services/variation/variation.service';

@Component({
  selector: 'app-new-variation-dialog',
  templateUrl: './new-variation-dialog.component.html',
  styleUrls: ['./new-variation-dialog.component.css'],
})
export class NewVariationDialogComponent {
  newBranchName: string = '';
  selectedVariation!: VariationDTO;
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<NewVariationDialogComponent>,
    private cookieService: CookieService,
    private variationService: VariationService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    console.log('get recipe INfo');
    this.sharedService.selectedVariation$.subscribe((data) => {
      if (data) {
        this.selectedVariation = data;
      }
    });
  }
  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('adding onSubmit()');
    const userId = +this.cookieService.get('userId');
    this.variationService
      .postNewVariation(
        this.newBranchName,
        this.selectedVariation.recipe.recipeId,
        userId,
        false
      )
      .subscribe(
        (variation) => {
          console.log('Variation created:', variation);
          this.close();
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
