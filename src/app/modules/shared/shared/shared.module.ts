import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: 'DD/MM/YYYY',
    showTodayButton: true,
    todayPosition: 'center'
  });
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    BsDatepickerModule,
  ],
  providers: [{ provide: BsDatepickerConfig, useFactory: getDatepickerConfig }]
})
export class SharedModule { }
