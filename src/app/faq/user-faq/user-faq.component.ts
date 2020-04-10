import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-user-faq',
  templateUrl: './user-faq.component.html',
  styleUrls: ['./user-faq.component.css']
})
export class UserFaqComponent implements OnInit {
  callbackLoginURL = environment.loginCallback;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
