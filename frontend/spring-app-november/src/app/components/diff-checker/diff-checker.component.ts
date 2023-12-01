import { Component, Input, Output } from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-diff-checker',
  templateUrl: './diff-checker.component.html',
  styleUrls: ['./diff-checker.component.css'],
})
export class DiffCheckerComponent {
  editorOptions = { theme: 'vs-dark', language: 'javascript' };

  @Input() text1: string = '';
  @Input() text2: string = '';
  isCompared = false;

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

  public ngOnInit() {}

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
      code: this.text2,
    });
    this.isCompared = true;
    window.scrollTo(0, 0); // scroll the window to top
  }
}
