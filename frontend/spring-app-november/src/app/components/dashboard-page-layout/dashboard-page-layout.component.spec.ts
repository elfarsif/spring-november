import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPageLayoutComponent } from './dashboard-page-layout.component';

describe('DashboardPageLayoutComponent', () => {
  let component: DashboardPageLayoutComponent;
  let fixture: ComponentFixture<DashboardPageLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardPageLayoutComponent]
    });
    fixture = TestBed.createComponent(DashboardPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
