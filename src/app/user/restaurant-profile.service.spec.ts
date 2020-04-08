import { TestBed } from '@angular/core/testing';

import { RestaurantProfileService } from './restaurant-profile.service';

describe('RestaurantProfileService', () => {
  let service: RestaurantProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
