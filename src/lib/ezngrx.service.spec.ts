import { TestBed } from '@angular/core/testing';

import { EzngrxService } from './ezngrx.service';

describe('EzngrxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EzngrxService = TestBed.get(EzngrxService);
    expect(service).toBeTruthy();
  });
});
