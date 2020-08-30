import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';

@NgModule({
  declarations: [DashboardComponent, ExpenseListComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
    NgbPaginationModule
  ]
})
export class DashboardModule { }
