import { TestBed } from '@angular/core/testing';

import { EzngrxService } from './ezngrx.service';

describe('EzngrxService', () => {
  let service: EzngrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EzngrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
