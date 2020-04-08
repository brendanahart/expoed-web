import { TestBed } from '@angular/core/testing';

import { PersonProfileService } from './person-profile.service';

describe('PersonProfileService', () => {
  let service: PersonProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
