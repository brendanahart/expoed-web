import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantSearchDialogComponent } from './restaurant-search-dialog.component';

describe('RestaurantSearchDialogComponent', () => {
  let component: RestaurantSearchDialogComponent;
  let fixture: ComponentFixture<RestaurantSearchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantSearchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
