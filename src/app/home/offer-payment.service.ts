import { Injectable } from '@angular/core';
import {GeneralHttpService} from '../general/general-http.service';
import {HttpClient} from '@angular/common/http';
import {RestaurantSearch} from '../search/restaurant-search';
import {RestaurantInfo} from '../user/restaurant-profile/restaurant-info';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {PaymentInfo} from './payment-info';

@Injectable({
  providedIn: 'root'
})
export class OfferPaymentService extends GeneralHttpService {

  url = environment.server + '/payment';

  constructor(protected http: HttpClient) {
    super(http);
  }

  postPaymentInfo(paymentInfo: PaymentInfo) {
    return this.http.post(this.url + '/checkout/init', paymentInfo);
  }
}
