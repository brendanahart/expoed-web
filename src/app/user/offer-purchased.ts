export class OfferPurchased {
  constructor(public id: number, public name: string, public email: string, public authId: string,
              public offerName: string, public price: number, public offerDesc: string, public txId: string, public redeemedRestaurant: boolean,
              public redeemedUser: boolean) {}
}
