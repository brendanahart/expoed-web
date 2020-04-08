import {ExpoedIdentity} from '../expoed-identity';

export class RestaurantOffering {
  id: string;
  restaurantOfferId: string;

  constructor(public restaurant: ExpoedIdentity, public offeringName: string, public offeringDesc: string, public price: number) {
    this.restaurantOfferId = '';
    this.id = '';
  }
}
