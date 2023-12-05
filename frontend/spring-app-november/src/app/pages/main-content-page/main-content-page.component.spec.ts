import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentPageComponent } from './main-content-page.component';

describe('MainContentPageComponent', () => {
  let component: MainContentPageComponent;
  let fixture: ComponentFixture<MainContentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainContentPageComponent]
    });
    fixture = TestBed.createComponent(MainContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
