import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeList3Component } from './recipe-list-3.component';

describe('RecipeList3Component', () => {
  let component: RecipeList3Component;
  let fixture: ComponentFixture<RecipeList3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeList3Component]
    });
    fixture = TestBed.createComponent(RecipeList3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
