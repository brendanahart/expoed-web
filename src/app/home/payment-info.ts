import {ExpoedIdentity} from '../user/expoed-identity';
import {RestaurantOffering} from '../user/restaurant-profile/restaurant-offering';

export class PaymentInfo {
  returnUrl: string;

  constructor(public offer: RestaurantOffering,
              public restaurant: ExpoedIdentity,
              public stripe: string,
              public url: string,
              public user: ExpoedIdentity) {}
}
