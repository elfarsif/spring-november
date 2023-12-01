import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitPageComponent } from './commit-page.component';

describe('CommitPageComponent', () => {
  let component: CommitPageComponent;
  let fixture: ComponentFixture<CommitPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommitPageComponent]
    });
    fixture = TestBed.createComponent(CommitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
