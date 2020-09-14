import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { map, toArray, tap } from 'rxjs/operators';
import { Observable, range } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent implements OnInit, OnChanges {

  @Input() currentMonthYear = moment();
  @Input() range = 3;

  @Output() monthYearChange: EventEmitter<any> = new EventEmitter<any>();

  monthsYears: Observable<any[]>;

  constructor() { }

  ngOnInit(): void {
    this.getMonthsYears(this.currentMonthYear);
  }

  ngOnChanges(): void {
    this.getMonthsYears(this.currentMonthYear);
  }

  getMonthsYears(currentMonthYear: any): void {
    this.monthsYears = range(-this.range, this.range * 2 + 1).pipe(
      map(off => moment(currentMonthYear).add(off, 'month')),
      toArray(),
    );
  }

  selectMonthYear(monthYear: any, event): void {
    this.cancelEvent(event);
    this.monthYearChange.emit(monthYear);
  }

  goToNextMonth(event): void {
    this.cancelEvent(event);
    const monthYear = moment(this.currentMonthYear).add(1, 'month');
    this.monthYearChange.emit(monthYear);
  }

  goToPreviousMonth(event): void {
    this.cancelEvent(event);
    const monthYear = moment(this.currentMonthYear).subtract(1, 'month');
    this.monthYearChange.emit(monthYear);
  }

  cancelEvent(event): void {
    event.preventDefault();
  }

}
