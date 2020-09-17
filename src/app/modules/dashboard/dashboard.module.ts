import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseFormModalComponent } from './components/expense-form-modal/expense-form-modal.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { SharedModule } from './../shared/shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, ExpenseListComponent, ExpenseFormModalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    FormsModule,
    SharedModule,
  ]
})
export class DashboardModule { }
