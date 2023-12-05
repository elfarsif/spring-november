import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecipeDialogComponent } from './new-recipe-dialog.component';

describe('NewRecipeDialogComponent', () => {
  let component: NewRecipeDialogComponent;
  let fixture: ComponentFixture<NewRecipeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewRecipeDialogComponent]
    });
    fixture = TestBed.createComponent(NewRecipeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
