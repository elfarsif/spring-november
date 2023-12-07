import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommitDialogComponent } from 'src/app/components/dialog/commit-dialog/commit-dialog.component';
import { DiffCheckerComponent } from 'src/app/components/diff-checker/diff-checker.component';
import { CommitDTO } from 'src/app/models/commit-dto.model';
import { RecipeDTO } from 'src/app/models/recipe-dto.model';
import { VariationDTO } from 'src/app/models/variation-dto.model';
import { CommitService } from 'src/app/services/commit/commit.service';
import { SelectedVariationService } from 'src/app/services/components/selected-variation/selected-variation.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { VariationService } from 'src/app/services/variation/variation.service';

@Component({
  selector: 'app-repository-page',
  templateUrl: './repository-page.component.html',
  styleUrls: ['./repository-page.component.css'],
})
export class RepositoryPageComponent implements OnInit {
  variations!: VariationDTO[];
  mainVariation!: VariationDTO;
  recipeId!: number;
  recipeDto!: RecipeDTO;
  selectedVariation: VariationDTO = {
    variationId: 0,
    variationTitle: '',
    instructions: '',
    recipe: this.recipeDto,
    isMain: false,
  };
  selectedVariationInstructions!: string;
  selectedPulledVariation!: VariationDTO;
  showCommitModal: boolean = false;
  commitMessage!: string;
  latestCommit: CommitDTO = {
    commitId: 0,
    variationId: 0,
    message: '',
    timestamp: '',
    results: '',
    instructions: '',
  };
  @ViewChild('diffCheckerComponent')
  diffCheckerComponent!: DiffCheckerComponent;
  recipeTitle!: string;

  constructor(
    private variationService: VariationService,
    private commitService: CommitService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private sharedService: SharedService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.recipeId = +params['id'];
      this.loadVariations();
    });
  }

  loadVariations() {
    this.variationService.getVariationsByRecipeId(this.recipeId).subscribe(
      (data) => {
        this.variations = data;
        this.selectedVariation = this.variations[0];
        this.sharedService.setSelectedVariation(data[0]);
        this.selectedVariationInstructions =
          this.selectedVariation.instructions;
        this.mainVariation = data[0] || {};
        this.recipeTitle = this.variations[0].recipe.title;
        this.getLatestCommitByVariationId();
      },
      (error) => {
        // Handle error
      }
    );
  }

  getMainVariationByRecipeId() {
    this.variationService.getMainVariationByRecipeId(this.recipeId).subscribe(
      (data) => {
        this.mainVariation = data[0];
        console.log('main variation is');
        console.log(this.mainVariation);
      },
      (error) => {
        console.error('Error in getMainVariationByRecipeId', error);
      }
    );
  }

  onVariationSelected(variation: VariationDTO) {
    this.sharedService.setSelectedVariation(variation);
    this.selectedVariation = variation;
    this.selectedVariationInstructions = this.selectedVariation.instructions;
    this.getLatestCommitByVariationId();
  }

  promptCommit() {
    this.showCommitModal = !this.showCommitModal;
  }

  hideCommitModal() {
    this.showCommitModal = false;

    if (this.diffCheckerComponent) {
      this.diffCheckerComponent.addNewCommit(this.commitMessage);
    }
  }

  getLatestCommitByVariationId() {
    this.commitService
      .getLatestCommitByVariationId(this.selectedVariation.variationId)
      .subscribe(
        (data) => {
          this.latestCommit = data;
          this.sharedService.setLatestCommit(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onCompare() {
    this.sharedService.triggerButtonClicked();
  }

  openDialogCommit(): void {
    const dialogRef = this.dialog.open(CommitDialogComponent);

    // You can subscribe to events like after the dialog is closed
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
