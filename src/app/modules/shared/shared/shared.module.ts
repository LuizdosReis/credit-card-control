import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { PaginationComponent } from './../components/pagination/pagination.component';
import { MonthPickerComponent } from './../components/month-picker/month-picker.component';


export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: 'DD/MM/YYYY',
    showTodayButton: true,
    todayPosition: 'center'
  });
}

@NgModule({
  declarations: [
    PaginationComponent,
    MonthPickerComponent
  ],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    BsDatepickerModule,
    PaginationComponent,
    MonthPickerComponent
  ],
  providers: [{ provide: BsDatepickerConfig, useFactory: getDatepickerConfig }]
})
export class SharedModule { }
