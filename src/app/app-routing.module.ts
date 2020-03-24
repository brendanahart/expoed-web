import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PersonProfileComponent} from './user/person-profile/person-profile.component';
import {RestaurantProfileComponent} from './user/restaurant-profile/restaurant-profile.component';
import {RestaurantGuardService} from './auth/restaurant-guard.service';
import {EaterGuardService} from './auth/eater-guard.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RestaurantFaqComponent} from './faq/restaurant-faq/restaurant-faq.component';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'eater',
    component: PersonProfileComponent,
    canActivate: [EaterGuardService]
  },
  {
    path: 'restaurant',
    component: RestaurantProfileComponent,
    canActivate: [RestaurantGuardService]
  },
  {
    path: 'partner',
    component: RestaurantFaqComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
