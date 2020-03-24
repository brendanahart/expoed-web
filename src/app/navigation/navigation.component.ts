import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {AuthService} from '../auth/auth.service';
import {async} from 'rxjs/internal/scheduler/async';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer,
              public auth: AuthService, private route: ActivatedRoute, private router: Router) {
    iconRegistry.addSvgIcon(
      'candy',
      sanitizer.bypassSecurityTrustResourceUrl('assets/logo/candy.svg'));
  }

  title = 'expoed';

  callbackURL = 'https://expoed.co';

  ngOnInit(): void {
  }


  async eaterOrRestaurant(auth: AuthService): Promise<any> {
    const user = await auth.getUser$().toPromise();

    const industry = user[this.callbackURL + '_' + 'user_metadata'].industry.toLowerCase();

    if (industry === 'eater') {
      this.router.navigate(['/eater']);
    } else if (industry === 'restaurant') {
      this.router.navigate(['/restaurant']);
    } else {
      this.router.navigate(['']);
    }

    return user;
  }

}
