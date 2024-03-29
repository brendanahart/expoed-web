import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-restaurant-faq',
  templateUrl: './restaurant-faq.component.html',
  styleUrls: ['./restaurant-faq.component.css']
})
export class RestaurantFaqComponent implements OnInit {
  callbackLoginURL = environment.loginCallback;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
