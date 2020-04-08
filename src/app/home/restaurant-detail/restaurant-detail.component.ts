import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RestaurantsService} from '../../search/restaurants.service';
import {Observable} from 'rxjs';
import {RestaurantInfo} from '../../user/restaurant-profile/restaurant-info';
import {ExpoedIdentity} from '../../user/expoed-identity';
import {RestaurantProfileService} from '../../user/restaurant-profile.service';
import {RestaurantOffering} from '../../user/restaurant-profile/restaurant-offering';
import {PaymentInfo} from '../payment-info';
import {Auth0Constants} from '../../auth/auth-0-constants';
import {AuthService} from '../../auth/auth.service';
import {ProfileType} from '../../user/profile-type';
import {environment} from '../../../environments/environment';
import {OfferPaymentService} from '../offer-payment.service';
import {loadStripe} from '@stripe/stripe-js';
import {Helper} from './helper';


@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  restaurants$: Observable<RestaurantInfo>;
  restaurantOfferings$: Observable<RestaurantOffering[]>;
  restaurantHelpers$: Observable<Helper[]>;

  restaurant: RestaurantInfo;
  restaurantOfferings: RestaurantOffering[];

  user: ExpoedIdentity;

  helpers: Helper[];

  domainDetail: string;

  industry: string;
  userId: string;

  constructor(private route: ActivatedRoute, private service: RestaurantProfileService,
              private auth: AuthService, private router: Router, private payment: OfferPaymentService) { }

  ngOnInit(): void {
    this.restaurant = new RestaurantInfo();
    this.restaurantOfferings = [];

    this.helpers = [];

    this.domainDetail = environment.domain;

    this.restaurants$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getRestaurantInfoForUser(new ExpoedIdentity(params.get('id'), null, null)))
    );

    this.restaurantOfferings$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getOfferingsUser(new ExpoedIdentity(params.get('id'), null, null)))
    );

    this.restaurantHelpers$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getHelpers(new ExpoedIdentity(params.get('id'), null, null)))
    );

    this.restaurants$.subscribe(res => {
      console.log(res);
      this.restaurant = res;
    });

    this.restaurantOfferings$.subscribe(res => {
      console.log(res);
      this.restaurantOfferings = res;
    });

    this.restaurantHelpers$.subscribe(res => {
      console.log(res);
      this.helpers = res;
    });

    this.auth.getUser$().subscribe((res) => {
      this.industry = res[Auth0Constants.callbackURL + '_' + Auth0Constants.userMetadata].industry.toLowerCase();
      this.user = new ExpoedIdentity(res.sub, res[Auth0Constants.callbackURL + '_' + Auth0Constants.userMetadata].name, res.name);
    });
  }

  onExternalLink(link) {
    const withHttp = url => !/^https?:\/\//i.test(url) ? `http://${url}` : url;
    window.location.href = withHttp(link);
  }

  onBuyHandler(offer: RestaurantOffering, restaurant: RestaurantInfo) {
    // create a payment object
    const paymentInfo = new PaymentInfo(offer, restaurant.restaurant, this.restaurant.stripe,
      this.domainDetail + this.router.url, this.user);

    if (this.industry === ProfileType.profileTypeE) {
      paymentInfo.returnUrl = this.domainDetail + '/eater';
    } else {
      paymentInfo.returnUrl = this.domainDetail + '/restaurant';
    }

    this.payment.postPaymentInfo(paymentInfo).subscribe(async res => {
      const stripeCheckoutId = res['id'];

      const stripe = await loadStripe(environment.stripeKey, {
        stripeAccount: this.restaurant.stripe
      });

      stripe.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: stripeCheckoutId,
      }).then( (result) => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        console.log(result.error.message);
      }).catch((result) => {
        console.log(result);
      });
    });

  }

}
