import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {RestaurantsService} from '../../search/restaurants.service';
import {switchMap} from 'rxjs/operators';
import {ParamMap} from '@angular/router';
import {RestaurantInfo} from '../../user/restaurant-profile/restaurant-info';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Address', 'City'];
  displayedColumnsAdj: string[] = ['Address', 'City'];
  displayedColumnsAdjIndex: string[] = ['address', 'city'];

  dataSource = new MatTableDataSource([]);

  restaurants$: Observable<RestaurantInfo[]>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private service: RestaurantsService) { }

  ngOnInit(): void {
    if (window.innerWidth <= 900) {
      this.displayedColumns = ['Name', 'City'];
      this.displayedColumnsAdj = ['City'];
      this.displayedColumnsAdjIndex = ['city'];
    } else {
      this.displayedColumns = ['Name', 'Address', 'City'];
      this.displayedColumnsAdj = ['Address', 'City'];
      this.displayedColumnsAdjIndex = ['address', 'city'];
    }

    this.restaurants$ = this.service.getAllRestaurants('');
    this.restaurants$.subscribe((res) => {
      this.dataSource = new MatTableDataSource<any>(res);
    }, (err) => {
      console.log('Could not get restaurants');
      console.log(err);
    });
  }

  onClickRow(row) {
    console.log(row);
  }


  onResizeTable(event): void {
    if (event.target.innerWidth <= 900) {
      this.displayedColumns = ['Name', 'City'];
      this.displayedColumnsAdj = ['City'];
      this.displayedColumnsAdjIndex = ['city'];
    } else {
      this.displayedColumns = ['Name', 'Address', 'City'];
      this.displayedColumnsAdj = ['Address', 'City'];
      this.displayedColumnsAdjIndex = ['address', 'city'];
    }
  }
}
