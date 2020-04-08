import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {RestaurantSearch} from './restaurant-search';
import {RestaurantInfo} from '../user/restaurant-profile/restaurant-info';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {GeneralHttpService} from '../general/general-http.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService extends GeneralHttpService  {

  url = environment.server + '/search';

  constructor(protected http: HttpClient) {
    super(http);
  }

  getRestaurants(searchTerm) {
    const restaurantSearch = new RestaurantSearch(searchTerm);

    return this.http.post<RestaurantInfo[]>(this.url, restaurantSearch)
      .pipe(
        catchError(this.handleError)
      );
  }
}
