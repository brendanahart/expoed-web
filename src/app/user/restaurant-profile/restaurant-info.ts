import {ExpoedIdentity} from '../expoed-identity';

export class RestaurantInfo {
  restaurant: ExpoedIdentity;
  address: string;
  addressTwo: string;
  city: string;
  state: string;
  zipCode: number;
  description: string;
  website: string;
  instagram: string;
  twitter: string;
  facebook: string;
  pictureUrl: string;
  verified: boolean;
  stripe: string;

  constructor() {
    this.restaurant = null;
    this.address = '';
    this.addressTwo = '';
    this.city = '';
    this.state = '';
    this.zipCode = 99999;
    this.description = '';
    this.website = '';
    this.instagram = '';
    this.twitter = '';
    this.facebook = '';
    this.pictureUrl = '';
    this.verified = null;
    this.stripe = '';
  }
}
