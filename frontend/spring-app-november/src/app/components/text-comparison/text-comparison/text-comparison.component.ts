import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-text-comparison',
  templateUrl: './text-comparison.component.html',
  styleUrls: ['./text-comparison.component.css'],
})
export class TextComparisonComponent {
  @Input() text1: string = '';
  @Input() text2: string = '';

  constructor() {}

  lines1: { text: string; isDiff: boolean }[] = [];
  lines2: { text: string; isDiff: boolean }[] = [];

  ngOnInit(): void {
    this.compareTexts();
  }

  compareTexts(): void {
    this.lines1 = [];
    this.lines2 = [];
    const split1 = this.text1.split('\n');
    const split2 = this.text2.split('\n');
    const maxLength = Math.max(split1.length, split2.length);

    for (let i = 0; i < maxLength; i++) {
      const line1 = split1[i] || '';
      const line2 = split2[i] || '';
      const isDiff = line1 !== line2;

      this.lines1.push({ text: line1 || ' ', isDiff });
      this.lines2.push({ text: line2 || ' ', isDiff });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    // Re-compute the differences if either text1 or text2 changes
    if (changes['text1'] || changes['text2']) {
      this.compareTexts();
    }
  }
}
