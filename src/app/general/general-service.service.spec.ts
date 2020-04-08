import { TestBed } from '@angular/core/testing';

import { GeneralHttpService } from './general-http.service';

describe('GeneralHttpService', () => {
  let service: GeneralHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
