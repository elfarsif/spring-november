import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffCheckerComponent } from './diff-checker.component';

describe('DiffCheckerComponent', () => {
  let component: DiffCheckerComponent;
  let fixture: ComponentFixture<DiffCheckerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiffCheckerComponent]
    });
    fixture = TestBed.createComponent(DiffCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
