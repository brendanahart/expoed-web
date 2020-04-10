import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonProfileComponent } from './user/person-profile/person-profile.component';
import { NavigationComponent } from './navigation/header/navigation.component';
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
import { RestaurantSearchComponent } from './home/restaurant-search/restaurant-search.component';
import { RestaurantSearchDialogComponent } from './home/restaurant-search-dialog/restaurant-search-dialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import { ImageComponent } from './user/image/image.component';
import {MatChipsModule} from '@angular/material/chips';
import { RestaurantDetailComponent } from './home/restaurant-detail/restaurant-detail.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import { FooterComponent } from './navigation/footer/footer.component';
import { UserFaqComponent } from './faq/user-faq/user-faq.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonProfileComponent,
    NavigationComponent,
    HomeComponent,
    RestaurantProfileComponent,
    PageNotFoundComponent,
    RestaurantFaqComponent,
    RestaurantSearchComponent,
    RestaurantSearchDialogComponent,
    ImageComponent,
    RestaurantDetailComponent,
    FooterComponent,
    UserFaqComponent,
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
    MatGridListModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDividerModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
