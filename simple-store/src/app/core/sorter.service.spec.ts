import { TestBed } from '@angular/core/testing';

import { SorterService } from './sorter.service';

describe('SorterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SorterService = TestBed.get(SorterService);
    expect(service).toBeTruthy();
  });
});
