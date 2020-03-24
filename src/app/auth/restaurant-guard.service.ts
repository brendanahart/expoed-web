import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  callbackURL = 'https://expoed.co';

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
    return this.auth.getUser$().pipe(
      map(user => {
        if (user === undefined) {
          this.router.navigate(['']);
          return false;
        } else {
          const industry = user[this.callbackURL + '_' + 'user_metadata'].industry.toLowerCase();
          if (industry === 'restaurant') {
            return true;
          } else {
            this.router.navigate(['/eater']);
            return false;
          }
        }
      })
    );
  }
}
