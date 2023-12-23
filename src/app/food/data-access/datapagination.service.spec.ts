import { TestBed } from '@angular/core/testing';

import { DatapaginationService } from './datapagination.service';

describe('DatapaginationService', () => {
  let service: DatapaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatapaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
