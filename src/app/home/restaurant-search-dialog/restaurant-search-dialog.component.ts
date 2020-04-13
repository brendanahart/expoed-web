import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-restaurant-search-dialog',
  templateUrl: './restaurant-search-dialog.component.html',
  styleUrls: ['./restaurant-search-dialog.component.css']
})
export class RestaurantSearchDialogComponent implements OnInit {

  searchInput: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.searchInput = '';
  }

  search(searchTerm): void {
    this.router.navigate(['/search', searchTerm]);
  }
}
