import { TestBed } from '@angular/core/testing';

import { ChartAdapterService } from './chart-adapter.service';

describe('ChartAdapterService', () => {
  let service: ChartAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
