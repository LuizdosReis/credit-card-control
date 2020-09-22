import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseFormModalComponent } from './components/expense-form-modal/expense-form-modal.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { SharedModule } from './../shared/shared/shared.module';
import { ExpenseChartComponent } from './components/expense-chart/expense-chart.component';

@NgModule({
  declarations: [DashboardComponent, ExpenseListComponent, ExpenseFormModalComponent, ExpenseChartComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    FormsModule,
    SharedModule,
    NgApexchartsModule
  ]
})
export class DashboardModule { }
