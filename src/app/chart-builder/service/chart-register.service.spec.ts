import { TestBed } from '@angular/core/testing';

import { ChartRegisterService } from './chart-register.service';

describe('ChartRegisterService', () => {
  let service: ChartRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
