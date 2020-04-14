import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RestaurantOffering} from '../../../user/restaurant-profile/restaurant-offering';
import {RestaurantInfo} from '../../../user/restaurant-profile/restaurant-info';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.css']
})
export class TipComponent {

  constructor(public dialogRef: MatDialogRef<TipComponent>, @Inject(MAT_DIALOG_DATA) public data: TipComponentData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface TipComponentData {
  offering: RestaurantOffering;
  restaurant: RestaurantInfo;
}
