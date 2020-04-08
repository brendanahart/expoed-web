import { Injectable } from '@angular/core';
import {ExpoedIdentity} from './expoed-identity';
import {GeneralHttpService} from '../general/general-http.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RestaurantInfo} from './restaurant-profile/restaurant-info';
import {RestaurantOffering} from './restaurant-profile/restaurant-offering';
import {OfferExpoed} from './offer-expoed';
import {OfferPurchased} from './offer-purchased';
import {Helper} from '../home/restaurant-detail/helper';

@Injectable({
  providedIn: 'root'
})
export class RestaurantProfileService extends GeneralHttpService {
  url = environment.server + '/restaurant';

  constructor(protected http: HttpClient) {
    super(http);
  }

  addRestaurant(user: ExpoedIdentity) {
    return this.http.post<ExpoedIdentity>(this.url + '/addRestaurant', user);
  }

  getRestaurantInfo(user: ExpoedIdentity) {
    return this.http.post<RestaurantInfo>(this.url + '/getRestaurantInfo', user);
  }

  getRestaurantInfoForUser(user: ExpoedIdentity) {
    return this.http.post<RestaurantInfo>(this.url + '/getRestaurantInfoUser', user);
  }

  updateRestaurantInfo(restaurantInfo: RestaurantInfo) {
    return this.http.post(this.url + '/updateRestaurantInfo', restaurantInfo);
  }

  addOffering(offering: RestaurantOffering) {
    return this.http.post<RestaurantOffering>(this.url + '/addOffering', offering);
  }

  deleteOffering(offering: RestaurantOffering) {
    return this.http.post<RestaurantOffering>(this.url + '/deleteOffering', offering);
  }

  getOfferings(user: ExpoedIdentity) {
    return this.http.post<RestaurantOffering[]>(this.url + '/getOfferings', user);
  }

  getOfferingsUser(user: ExpoedIdentity) {
    return this.http.post<RestaurantOffering[]>(this.url + '/getOfferingsUser', user);
  }

  getStripeCallbackInfo() {
    return this.http.get(this.url + '/stripe/connect/oauth');
  }

  getOffersExpoed(user: ExpoedIdentity) {
    return this.http.post<OfferExpoed[]>(this.url + '/getRestaurantExpos', user);
  }

  getOffersPurchased(user: ExpoedIdentity) {
    return this.http.post<OfferPurchased[]>(this.url + '/getOffersPurchased', user);
  }

  getHelpers(user: ExpoedIdentity) {
    return this.http.post<Helper[]>(this.url + '/getHelpers', user);
  }
}
