import { TestBed } from '@angular/core/testing';

import { SelectedVariationService } from './selected-variation.service';

describe('SelectedVariationService', () => {
  let service: SelectedVariationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedVariationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
