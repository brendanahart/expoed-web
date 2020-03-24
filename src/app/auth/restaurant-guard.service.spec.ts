import { TestBed } from '@angular/core/testing';

import { RestaurantGuardService } from './restaurant-guard.service';

describe('RestaurantGuardService', () => {
  let service: RestaurantGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
