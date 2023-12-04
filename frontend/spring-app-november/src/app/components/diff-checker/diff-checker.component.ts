import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor-v2';
import { CommitDTO } from 'src/app/models/commit-dto.model';
import { VariationDTO } from 'src/app/models/variation-dto.model';
import { CommitService } from 'src/app/services/commit/commit.service';
import { SelectedVariationService } from 'src/app/services/components/selected-variation/selected-variation.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-diff-checker',
  templateUrl: './diff-checker.component.html',
  styleUrls: ['./diff-checker.component.css'],
})
export class DiffCheckerComponent implements OnInit {
  editorOptions = { theme: 'vs-dark', language: 'javascript' };

  @Input() text1!: VariationDTO;
  @Input() selectedVariation!: VariationDTO;
  @Input() selectedVariationInstructions!: string;
  isCompared = false;
  results!: string;

  @Output() addCommitMessage = new EventEmitter<void>();

  @Output()
  selectedLang = 'plaintext';
  @Output()
  selectedTheme = 'vs';

  // input
  inputOptions = { theme: 'vs', language: 'plaintext' };
  // compare, output
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

  selectedVariation2: any;
  latestCommitInstructions!: string | undefined;

  constructor(
    private commitService: CommitService,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.sharedService.selectedVariation$.subscribe((variation) => {
      this.selectedVariation2 = variation;
    });
    this.sharedService.latestCommit$.subscribe((commit) => {
      this.latestCommitInstructions = commit?.instructions;
      console.log('latest commit in diff-checker:', commit);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['text1']) {
      this.text1 = changes['text1'].currentValue;
    }
    if (changes['text2']) {
      this.selectedVariation = changes['text2'].currentValue;
    }
  }

  onChangeInline(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.diffOptions = Object.assign({}, this.diffOptions, {
      renderSideBySide: !inputElement.checked,
    });
  }

  onCompare() {
    this.originalModel = Object.assign({}, this.originalModel, {
      code: this.text1,
    });
    this.modifiedModel = Object.assign({}, this.originalModel, {
      code: this.selectedVariation,
    });
    this.isCompared = !this.isCompared;
    window.scrollTo(0, 0); // scroll the window to top
  }

  addNewCommit(commitMessage: string) {
    this.commitService
      .addNewCommit(
        this.selectedVariation.variationId,
        commitMessage,
        this.selectedVariation.instructions,
        this.results
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error(error);
        }
      );
  }
  promptCommit() {
    this.addCommitMessage.emit();
  }
}
