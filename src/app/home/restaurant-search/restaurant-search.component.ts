import {Component, OnChanges, OnInit} from '@angular/core';
import {RestaurantInfo} from '../../user/restaurant-profile/restaurant-info';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {RestaurantsService} from '../../search/restaurants.service';
import {Observable} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-restaurant-search',
  templateUrl: './restaurant-search.component.html',
  styleUrls: ['./restaurant-search.component.css']
})
export class RestaurantSearchComponent implements OnInit {

  restaurants$: Observable<RestaurantInfo[]>;

  restaurants: RestaurantInfo[];
  splicedRestaurants: RestaurantInfo[];
  length = 100;

  otherRestaurants: RestaurantInfo[];
  otherSplicedRestaurants: RestaurantInfo[];
  otherLength = 100;

  // paginator
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;
  otherPageEvent: PageEvent;


  constructor(private route: ActivatedRoute, private service: RestaurantsService) { }

  ngHelpers(): void {
    this.restaurants = [];
    this.splicedRestaurants = [];
    this.otherRestaurants = [];
    this.otherSplicedRestaurants = [];

    this.restaurants$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getRestaurants(params.get('term')))
    );

    this.restaurants$.subscribe(res => {
      console.log(res);
      const matchingRestaurants = [];
      const randomRestaurants = [];

      let randomRestaurantsSwitch = false;

      for (const recievedRestaurant of res) {
        if (recievedRestaurant.restaurant.id == null) {
          randomRestaurantsSwitch = true;
        } else {
          if (!randomRestaurantsSwitch) {
            matchingRestaurants.push(recievedRestaurant);
          } else {
            randomRestaurants.push(recievedRestaurant);
          }
        }
      }

      this.restaurants = matchingRestaurants;
      this.splicedRestaurants = matchingRestaurants.slice(((0 + 1) - 1) * this.pageSize).slice(0, this.pageSize);
      this.length = this.restaurants.length;

      this.otherRestaurants = randomRestaurants;
      this.otherSplicedRestaurants = randomRestaurants.slice(((0 + 1) - 1) * this.pageSize).slice(0, this.pageSize);
      this.otherLength = this.otherRestaurants.length;
    });
  }

  ngOnInit(): void {
    this.ngHelpers();
  }

  handlePageEvent(pageEvent?: PageEvent): PageEvent {
    const offset = ((pageEvent.pageIndex + 1) - 1) * pageEvent.pageSize;
    this.splicedRestaurants = this.restaurants.slice(offset).slice(0, pageEvent.pageSize);

    return pageEvent;
  }

  otherHandlePageEvent(pageEvent?: PageEvent): PageEvent {
    const offset = ((pageEvent.pageIndex + 1) - 1) * pageEvent.pageSize;
    this.otherSplicedRestaurants = this.otherRestaurants.slice(offset).slice(0, pageEvent.pageSize);

    return pageEvent;
  }


}
