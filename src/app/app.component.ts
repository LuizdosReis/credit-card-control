import { Component, OnInit } from '@angular/core';
import { BigNumber } from 'bignumber.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    BigNumber.set({
      ROUNDING_MODE: BigNumber.ROUND_DOWN,
      DECIMAL_PLACES: 2
    });
  }

}
