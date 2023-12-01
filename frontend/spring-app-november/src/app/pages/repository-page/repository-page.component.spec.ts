import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryPageComponent } from './repository-page.component';

describe('RepositoryPageComponent', () => {
  let component: RepositoryPageComponent;
  let fixture: ComponentFixture<RepositoryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoryPageComponent]
    });
    fixture = TestBed.createComponent(RepositoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
