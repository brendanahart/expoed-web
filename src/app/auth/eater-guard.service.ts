import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {ProfileType} from '../user/profile-type';
import {Auth0Constants} from './auth-0-constants';

@Injectable({
  providedIn: 'root'
})
export class EaterGuardService implements CanActivate {

  callbackUrl = Auth0Constants.callbackURL;

  constructor(private auth: AuthService, private router: Router) {}


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
    return this.auth.getUser$().pipe(
      map(user => {
        if (user === undefined) {
          this.router.navigate(['']);
          return false;
        } else {
          const industry = user[this.callbackUrl + '_' + Auth0Constants.userMetadata].industry.toLowerCase();
          if (industry === ProfileType.profileTypeE) {
            return true;
          } else {
            this.router.navigate(['/restaurant']);
            return false;
          }
        }
      })
    );
  }
}
