import { Injectable } from '@angular/core';
import {GeneralHttpService} from '../general/general-http.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {EaterInfo} from './person-profile/eater-info';
import {ExpoedIdentity} from './expoed-identity';
import {RestaurantInfo} from './restaurant-profile/restaurant-info';
import {OfferExpoed} from './offer-expoed';
import {OfferPurchased} from './offer-purchased';

@Injectable({
  providedIn: 'root'
})
export class PersonProfileService extends GeneralHttpService {
  url = environment.server + '/person';

  constructor(protected http: HttpClient) {
    super(http);
  }

  addEater(user: ExpoedIdentity) {
    return this.http.post<ExpoedIdentity>(this.url + '/addEater', user);
  }

  getEaterInformation(user: ExpoedIdentity) {
    return this.http.post<EaterInfo>(this.url + '/getEaterInfo', user);
  }

  updateEaterInfomration(user: EaterInfo) {
    return this.http.post<EaterInfo>(this.url + '/updateEaterInfo', user);
  }

  getEaterOffers(user: ExpoedIdentity) {
    return this.http.post<OfferExpoed[]>(this.url + '/getEaterOffers', user);
  }

  updateRedeemedConfirmedTrue(offer: OfferExpoed) {
    return this.http.post(this.url + '/updateRedeemedConfirmedTrue', offer);
  }

  updateRedeemedConfirmedFalse(offer: OfferExpoed) {
    return this.http.post(this.url + '/updateRedeemedConfirmedFalse', offer);
  }

  updateRedeemedConfirmedRTrue(offer: OfferPurchased) {
    return this.http.post(this.url + '/updateRedeemedConfirmedRTrue', offer);
  }

  updateRedeemedConfirmedRFalse(offer: OfferPurchased) {
    return this.http.post(this.url + '/updateRedeemedConfirmedRFalse', offer);
  }
}
