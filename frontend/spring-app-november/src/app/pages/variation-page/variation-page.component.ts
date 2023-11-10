import { Component } from '@angular/core';
import { VariationService } from 'src/app/services/variation/variation.service';

@Component({
  selector: 'app-variation-page',
  templateUrl: './variation-page.component.html',
  styleUrls: ['./variation-page.component.css'],
})
export class VariationPageComponent {
  constructor(private variationService: VariationService) {}
  ngOnInit() {
    console.log('get variation for username');
    this.variationService.getAllVariations().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {}
    );
  }
}
