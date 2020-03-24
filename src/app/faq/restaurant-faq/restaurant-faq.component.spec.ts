import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFaqComponent } from './restaurant-faq.component';

describe('RestaurantFaqComponent', () => {
  let component: RestaurantFaqComponent;
  let fixture: ComponentFixture<RestaurantFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
