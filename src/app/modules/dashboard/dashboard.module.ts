import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseFormModalComponent } from './components/expense-form-modal/expense-form-modal.component';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  declarations: [DashboardComponent, ExpenseListComponent, ExpenseFormModalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    NgbModule,
    FormsModule
  ]
})
export class DashboardModule { }
