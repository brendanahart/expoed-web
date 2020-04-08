export class OfferExpoed {
  constructor(public id: number, public restaurantName: string, public restaurantEmail: string, public offerName: string,
              public offerPrice: number, public txId: string,
              public paid: boolean, public redeemedRestaurant: boolean, public redeemedUser: boolean) {}
}
