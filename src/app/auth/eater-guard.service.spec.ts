import { TestBed } from '@angular/core/testing';

import { EaterGuardService } from './eater-guard.service';

describe('EaterGuardService', () => {
  let service: EaterGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EaterGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
