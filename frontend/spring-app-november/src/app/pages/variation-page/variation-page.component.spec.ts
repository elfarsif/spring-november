import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationPageComponent } from './variation-page.component';

describe('VariationPageComponent', () => {
  let component: VariationPageComponent;
  let fixture: ComponentFixture<VariationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VariationPageComponent]
    });
    fixture = TestBed.createComponent(VariationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
