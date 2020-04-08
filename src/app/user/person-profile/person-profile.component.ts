import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {EaterInfo} from './eater-info';
import {FormControl, FormGroup} from '@angular/forms';
import {PersonProfileService} from '../person-profile.service';
import {ProfileType} from '../profile-type';
import {ExpoedIdentity} from '../expoed-identity';
import {Auth0Constants} from '../../auth/auth-0-constants';
import {OfferExpoed} from '../offer-expoed';

@Component({
  selector: 'app-person-profile',
  templateUrl: './person-profile.component.html',
  styleUrls: ['./person-profile.component.css']
})
export class PersonProfileComponent implements OnInit {
  profileType = ProfileType.profileTypeE;

  constructor(public auth: AuthService, public personProfile: PersonProfileService, private cdRef: ChangeDetectorRef) { }

  userInfoForm = new FormGroup({
    city: new FormControl(''),
    favoriteFoods: new FormControl(''),
  });

  offers: OfferExpoed[];
  userInfo: EaterInfo;

  gridListBreakpoint: number;

  ngOnInit() {
    this.offers = [];
    this.userInfo = new EaterInfo();

    this.gridListBreakpoint = (window.innerWidth <= 1200) ? 1 : 2;

    this.auth.getUser$().subscribe((res) => {
      this.userInfo.user = new ExpoedIdentity(res.sub, res[Auth0Constants.callbackURL + '_' + Auth0Constants.userMetadata].name,
        res.email);

      this.personProfile.getEaterInformation(this.userInfo.user).subscribe((resInfo) => {
        console.log(resInfo);
        this.userInfo = resInfo;
      }, (err) => {
        console.log(err);
        console.log('could not get restaurant info');
      });

      this.personProfile.getEaterOffers(this.userInfo.user).subscribe((resExpoed) => {
        console.log(resExpoed);
        this.offers = resExpoed;
      }, (err) => {
        console.log(err);
        console.log('could not get list of restaurants expoed');
      });

    });
  }

  onResize(event) {
    this.gridListBreakpoint = (event.target.innerWidth <= 1200) ? 1 : 2;
  }

  onUserInfoSubmit() {
    console.log(this.userInfoForm.value);
    this.userInfo.city = this.userInfoForm.value.city;
    this.userInfo.favoriteFoods = this.userInfoForm.value.favoriteFoods;

    this.personProfile.updateEaterInfomration(this.userInfo).subscribe((eaterInfo) => {
      console.log(eaterInfo);
    }, (err) => {
      console.log(err);
      console.log('could not get update eater info');
    });
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

  onUploadImage(url: string) {
    this.userInfo.pictureUrl = url;
    this.cdRef.detectChanges();
  }
}
