import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  callbackLoginURL = environment.loginCallback;

  constructor(private router: Router, public auth: AuthService) {
  }

  ngOnInit(): void {

  }

  goToCurrentRestaurants() {
    this.router.navigate(['/partners']);
  }

}
