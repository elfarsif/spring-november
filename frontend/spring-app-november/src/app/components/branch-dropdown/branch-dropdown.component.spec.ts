import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchDropdownComponent } from './branch-dropdown.component';

describe('BranchDropdownComponent', () => {
  let component: BranchDropdownComponent;
  let fixture: ComponentFixture<BranchDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchDropdownComponent]
    });
    fixture = TestBed.createComponent(BranchDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
