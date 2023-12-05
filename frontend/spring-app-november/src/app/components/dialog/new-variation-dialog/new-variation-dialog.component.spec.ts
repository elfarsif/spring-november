import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVariationDialogComponent } from './new-variation-dialog.component';

describe('NewVariationDialogComponent', () => {
  let component: NewVariationDialogComponent;
  let fixture: ComponentFixture<NewVariationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewVariationDialogComponent]
    });
    fixture = TestBed.createComponent(NewVariationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
