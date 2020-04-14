import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PersonProfileComponent} from './user/person-profile/person-profile.component';
import {RestaurantProfileComponent} from './user/restaurant-profile/restaurant-profile.component';
import {RestaurantGuardService} from './auth/restaurant-guard.service';
import {EaterGuardService} from './auth/eater-guard.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RestaurantFaqComponent} from './faq/restaurant-faq/restaurant-faq.component';
import {RestaurantSearchComponent} from './home/restaurant-search/restaurant-search.component';
import {RestaurantDetailComponent} from './home/restaurant-detail/restaurant-detail.component';
import {AuthGuard} from './auth/auth-guard.service';
import {UserFaqComponent} from './faq/user-faq/user-faq.component';
import {PartnersComponent} from './home/partners/partners.component';
import {LoginComponent} from './login/login.component';


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
    path: 'login',
    component: LoginComponent
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
  {
    path: 'partners',
    component: PartnersComponent
  },
  {
    path: 'waiting',
    component: UserFaqComponent
  },
  {
    path: 'search/:term',
    component: RestaurantSearchComponent
  },
  {
    path: 'search',
    component: RestaurantSearchComponent
  },
  {
    path: 'detail/:id',
    component: RestaurantDetailComponent,
  },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
