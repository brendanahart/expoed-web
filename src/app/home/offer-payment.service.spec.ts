import { TestBed } from '@angular/core/testing';

import { OfferPaymentService } from './offer-payment.service';

describe('OfferPaymentService', () => {
  let service: OfferPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
