import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonProfileComponent } from './user/person-profile/person-profile.component';
import { NavigationComponent } from './navigation/navigation.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RestaurantProfileComponent } from './user/restaurant-profile/restaurant-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RestaurantFaqComponent } from './faq/restaurant-faq/restaurant-faq.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonProfileComponent,
    NavigationComponent,
    HomeComponent,
    RestaurantProfileComponent,
    PageNotFoundComponent,
    RestaurantFaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
