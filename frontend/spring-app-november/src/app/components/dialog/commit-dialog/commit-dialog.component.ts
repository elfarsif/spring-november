import { Component } from '@angular/core';
import { DiffCheckerComponent } from '../../diff-checker/diff-checker.component';
import { SharedService } from 'src/app/services/shared/shared.service';
import { CommitDTO } from 'src/app/models/commit-dto.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommitService } from 'src/app/services/commit/commit.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-commit-dialog',
  templateUrl: './commit-dialog.component.html',
  styleUrls: ['./commit-dialog.component.css'],
})
export class CommitDialogComponent {
  currentCommit: CommitDTO = {
    commitId: 0,
    variationId: 0,
    message: '',
    timestamp: '',
    results: '',
    instructions: '',
  };
  myForm!: FormGroup;

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private commitService: CommitService,
    private router: Router,

    private dialogRef: MatDialogRef<CommitDialogComponent>
  ) {
    this.myForm = this.fb.group({
      input1: ['', Validators.required],
      input2: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.sharedService.latestCommit$.subscribe((data) => {
      if (data) {
        this.currentCommit = data;
      }
      console.log('for commit action', data);
    });
  }
  close() {
    this.dialogRef.close();
  }

  diffCheckerComponent!: DiffCheckerComponent;
  onSubmit() {
    this.currentCommit.message = this.myForm.get('input1')?.value;
    this.currentCommit.results = this.myForm.get('input2')?.value;
    console.log(this.myForm.value);
    this.commitService
      .addNewCommit(
        this.currentCommit.variationId,
        this.currentCommit.message,
        this.currentCommit.instructions,
        this.currentCommit.results
      )
      .subscribe(
        (data) => {
          console.log('commit returned', data);
          this.dialogRef.close();
          this.refreshCurrentRoute();
        },
        (error) => {
          console.error(error);
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
