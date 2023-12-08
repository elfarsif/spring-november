import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DiffEditorModel } from 'ngx-monaco-editor-v2';
import { CommitDTO } from 'src/app/models/commit-dto.model';
import { CommitService } from 'src/app/services/commit/commit.service';

@Component({
  selector: 'app-commit-page',
  templateUrl: './commit-page.component.html',
  styleUrls: ['./commit-page.component.css'],
})
export class CommitPageComponent {
  variationId!: number;
  commits!: any[];
  diffOptions = {
    theme: 'vs',
    language: 'plaintext',
    readOnly: true,
    renderSideBySide: true,
  };
  originalModel: DiffEditorModel = {
    code: '',
    language: 'plaintext',
  };

  modifiedModel: DiffEditorModel = {
    code: '',
    language: 'plaintext',
  };

  constructor(
    private commitService: CommitService,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.variationId = +params['id'];
    });
    this.loadRecipes();
  }
  loadRecipes() {
    this.commitService.getCommitsByVariation(this.variationId).subscribe(
      (data) => {
        this.commits = data.map((item, index) => {
          return { index, item };
        });
        console.log(this.commits);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onPanelOpened(commit: any) {
    console.log('panel opened', this.commits[commit.index - 1]);
    if (this.commits[commit.index - 1]) {
      this.originalModel = Object.assign({}, this.originalModel, {
        code: this.commits[commit.index - 1].item.instructions,
      });
      this.modifiedModel = Object.assign({}, this.originalModel, {
        code: commit.item.instructions,
      });
      window.scrollTo(0, 0);
    } else {
      this.originalModel = Object.assign({}, this.originalModel, {
        code: '',
      });
      this.modifiedModel = Object.assign({}, this.originalModel, {
        code: commit.item.instructions,
      });
      window.scrollTo(0, 0);
    }
  }
}
