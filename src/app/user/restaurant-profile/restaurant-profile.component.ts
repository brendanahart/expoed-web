import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {ExpoedIdentity} from '../expoed-identity';
import {RestaurantInfo} from './restaurant-info';
import {RestaurantOffering} from './restaurant-offering';
import {FormControl, FormGroup} from '@angular/forms';
import {ProfileType} from '../profile-type';
import {Auth0Constants} from '../../auth/auth-0-constants';
import {RestaurantProfileService} from '../restaurant-profile.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {OfferExpoed} from '../offer-expoed';
import {PersonProfileService} from '../person-profile.service';
import {OfferPurchased} from '../offer-purchased';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-restaurant-profile',
  templateUrl: './restaurant-profile.component.html',
  styleUrls: ['./restaurant-profile.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RestaurantProfileComponent implements OnInit {
  profileTypeR = ProfileType.profileTypeR;
  profileTypeO = ProfileType.profileTypeO;

  stripeClientId = environment.stripeClientId;

  stripe$: Observable<any>;

  constStripeBase = 'https://connect.stripe.com/oauth/authorize?';

  offers: OfferExpoed[];

  offersPurchased: OfferPurchased[];
  columnsToDisplay = ['Name', 'Email', 'Offer Name', 'Price', 'Redeemed', 'User Confirmed Redeem'];
  columnsToDisplayIndex = ['name', 'email', 'offerName', 'price', 'redeemedRestaurant', 'redeemedUser'];
  expandedElement: OfferPurchased | null;

  constructor(public auth: AuthService, private restaurantProfile: RestaurantProfileService, private personProfile: PersonProfileService,
              private cdRef: ChangeDetectorRef) { }

  restaurantInfo: RestaurantInfo;
  restaurantOfferings: RestaurantOffering[]; // going to have to be an observable

  offeringAdded: boolean;

  restaurantInfoForm = new FormGroup({
    address: new FormControl(''),
    addressTwo: new FormControl(''),
    city: new FormControl(''),
    description: new FormControl(''),
    facebook: new FormControl(''),
    instagram: new FormControl(''),
    state: new FormControl(''),
    twitter: new FormControl(''),
    website: new FormControl(''),
    zipCode: new FormControl(''),
  });

  restaurantOfferForm = new FormGroup({
    offeringName: new FormControl(''),
    offeringDesc: new FormControl(''),
    price: new FormControl(''),
  });

  gridListBreakpoint: number;

  ngOnInit() {
    this.offers = [];
    this.gridListBreakpoint = (window.innerWidth <= 1200) ? 1 : 2;

    if (window.innerWidth <= 900) {
      this.columnsToDisplay = ['Name', 'Offer Name'];
      this.columnsToDisplayIndex = ['name', 'offerName'];
    } else {
      this.columnsToDisplay = ['Name', 'Email', 'Offer Name', 'Price', 'Redeemed', 'User Confirmed Redeem'];
      this.columnsToDisplayIndex = ['name', 'email', 'offerName', 'price', 'redeemedRestaurant', 'redeemedUser'];
    }

    this.offeringAdded = false;
    this.restaurantInfo = new RestaurantInfo();
    this.restaurantOfferings = [];

    this.auth.getUser$().subscribe((res) => {
      this.restaurantInfo.restaurant = new ExpoedIdentity(res.sub, res[Auth0Constants.callbackURL + '_' + Auth0Constants.userMetadata].name,
        res.email);
      this.restaurantProfile.getRestaurantInfo(this.restaurantInfo.restaurant).subscribe((resInfo) => {
        console.log(resInfo);
        this.restaurantInfo = resInfo;
      }, (err) => {
        console.log(err);
        console.log('could not get restaurant info');
      });

      this.restaurantProfile.getOfferings(this.restaurantInfo.restaurant).subscribe((resInfo) => {
        console.log(resInfo);
        this.restaurantOfferings = resInfo;
      }, (err) => {
        console.log(err);
        console.log('could not get restaurant offerings');
      });

      this.restaurantProfile.getOffersExpoed(this.restaurantInfo.restaurant).subscribe((resInfo) => {
        console.log(resInfo);
        this.offers = resInfo;
      }, (err) => {
        console.log(err);
        console.log('could not get list of restaurants expoed');
      });

      this.restaurantProfile.getOffersPurchased(this.restaurantInfo.restaurant).subscribe((resInfo) => {
        console.log(resInfo);
        this.offersPurchased = resInfo;
      }, (err) => {
        console.log(err);
        console.log('could not get list of restaurants expoed');
      });
    });

    this.stripe$ = this.restaurantProfile.getStripeCallbackInfo();


  }

  deleteOffering(offer: RestaurantOffering): void {
    this.restaurantProfile.deleteOffering(offer).subscribe((res) => {
      console.log(res);
      // remove from array
      this.restaurantOfferings = this.restaurantOfferings.filter((value, index, arr) => {
        return value.id !== res.id;
      });

    }, (err) => {
      console.log(err);
      console.log('could not delete restaurant offer');
    });
    return;
  }

  sparkAddOfferingForm(): void {
    this.offeringAdded = true;
  }

  onRestaurantInfoSubmit(): void {
    console.log(this.restaurantInfoForm.value);
    this.restaurantInfo.address = this.restaurantInfoForm.value.address;
    this.restaurantInfo.addressTwo = this.restaurantInfoForm.value.addressTwo;
    this.restaurantInfo.city = this.restaurantInfoForm.value.city;
    this.restaurantInfo.description = this.restaurantInfoForm.value.description;
    this.restaurantInfo.facebook = this.restaurantInfoForm.value.facebook;
    this.restaurantInfo.instagram = this.restaurantInfoForm.value.instagram;
    this.restaurantInfo.state = this.restaurantInfoForm.value.state;
    this.restaurantInfo.twitter = this.restaurantInfoForm.value.twitter;
    this.restaurantInfo.website = this.restaurantInfoForm.value.website;
    this.restaurantInfo.zipCode = this.restaurantInfoForm.value.zipCode;

    this.restaurantProfile.updateRestaurantInfo(this.restaurantInfo).subscribe((resInfo) => {
      console.log(resInfo);
    }, (err) => {
      console.log(err);
      console.log('could not get update restaurant info');
    });
  }

  onRestaurantOfferSubmit(): void {
    // TOOD: validate
    console.log(this.restaurantOfferForm.value);

    const newOffer = new RestaurantOffering(this.restaurantInfo.restaurant,
      this.restaurantOfferForm.value.offeringName,
      this.restaurantOfferForm.value.offeringDesc,
      this.restaurantOfferForm.value.price);

    this.restaurantProfile.addOffering(newOffer).subscribe((res) => {
      console.log(res);
      this.restaurantOfferings.push(res);
    }, (err) => {
      console.log(err);
      console.log('could not delete restaurant offer');
    });

    this.restaurantOfferForm = new FormGroup({
      offeringName: new FormControl(''),
      offeringDesc: new FormControl(''),
      price: new FormControl(''),
    });

    this.offeringAdded = false;
  }

  onHandleConnectWithStripe(): void {
    if (this.restaurantInfo != null) {
      const state = this.restaurantInfo.restaurant.id;
      const scope = 'read_write';
      const responseType = 'code';

      let stripeUrl = this.constStripeBase + 'client_id=' + this.stripeClientId + '&' + 'state=' +
        state + '&' + 'scope=' + scope + '&' + 'response_type=' + responseType + '&' + 'stripe_user[email]=' + this.restaurantInfo.restaurant.email;

      if (this.restaurantInfo.website !== '') {
        stripeUrl = stripeUrl + '&stripe_user[url]=' + this.restaurantInfo.website;
      }

      window.open(stripeUrl, '_blank');

      this.stripe$.subscribe((res) => {
        console.log(res);
        if ('success' in res) {
          if (res['success']) {
            console.log('Linked Stripe');
          } else {
            console.log('Could not link stripe with expoed');
          }
        } else {
          console.log('Could not link stripe with expoed: ' + res['error']);
        }
      }, (err) => {
        console.log(err);
        console.log('could not delete restaurant offer');
      });
    }
  }

  onHandleGoToDashboard(): void {
    window.open('https://dashboard.stripe.com' + '/' + this.restaurantInfo.stripe, '_blank');
  }

  onResize(event) {
    this.gridListBreakpoint = (event.target.innerWidth <= 1200) ? 1 : 2;
  }

  onOfferRedeemed(offer: OfferExpoed) {
    const actualId = offer.id;
    this.personProfile.updateRedeemedConfirmedTrue(offer).subscribe((res) => {
      console.log('updated offer');
      this.offers.find(x => x.id === actualId).redeemedUser = true;
    }, (err) => {
      console.log(err);
      console.log('could not updated offer');
    });
  }

  onOfferNotRedeemed(offer: OfferExpoed) {
    const actualId = offer.id;
    this.personProfile.updateRedeemedConfirmedFalse(offer).subscribe((res) => {
      console.log('updated offer');
      this.offers.find(x => (x.id === actualId)).redeemedUser = false;
    }, (err) => {
      console.log(err);
      console.log('could not updated offer');
    });
  }

  onOfferRedeemedR(offer: OfferPurchased) {
    const actualId = offer.id;
    this.personProfile.updateRedeemedConfirmedRTrue(offer).subscribe((res) => {
      console.log('updated offer');
      this.offersPurchased.find(x => (x.id === actualId)).redeemedRestaurant = true;
    }, (err) => {
      console.log(err);
      console.log('could not updated offer');
    });
  }

  onOfferNotRedeemedR(offer: OfferPurchased) {
    const actualId = offer.id;
    this.personProfile.updateRedeemedConfirmedRFalse(offer).subscribe((res) => {
      console.log('updated offer');
      this.offersPurchased.find(x => (x.id === actualId)).redeemedRestaurant = false;
    }, (err) => {
      console.log(err);
      console.log('could not updated offer');
    });
  }

  onUploadImage(url: string) {
    this.restaurantInfo.pictureUrl = url;
    this.cdRef.detectChanges();
  }

  onResizeTable(event): void {
    if (event.target.innerWidth <= 900) {
      this.columnsToDisplay = ['Name', 'Offer Name'];
      this.columnsToDisplayIndex = ['name', 'offerName'];
    } else {
      this.columnsToDisplay = ['Name', 'Email', 'Offer Name', 'Price', 'Redeemed', 'User Confirmed Redeem'];
      this.columnsToDisplayIndex = ['name', 'email', 'offerName', 'price', 'redeemedRestaurant', 'redeemedUser'];
    }

    this.gridListBreakpoint = (event.target.innerWidth <= 1200) ? 1 : 2;
  }

}
