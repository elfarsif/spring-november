import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedPageComponent } from './assigned-page.component';

describe('AssignedPageComponent', () => {
  let component: AssignedPageComponent;
  let fixture: ComponentFixture<AssignedPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedPageComponent]
    });
    fixture = TestBed.createComponent(AssignedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
