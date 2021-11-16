import { TestBed } from '@angular/core/testing';

import { ConfigurationParserService } from './configuration-parser.service';

describe('ConfigurationParserService', () => {
  let service: ConfigurationParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurationParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
