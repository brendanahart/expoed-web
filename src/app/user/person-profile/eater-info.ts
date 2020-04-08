import {ExpoedIdentity} from '../expoed-identity';

export class EaterInfo {
  user: ExpoedIdentity;
  city: string;
  favoriteFoods: string[];
  pictureUrl: string;

  constructor() {
    this.user = null;
    this.city = null;
    this.favoriteFoods = null;
    this.pictureUrl = null;
  }
}
