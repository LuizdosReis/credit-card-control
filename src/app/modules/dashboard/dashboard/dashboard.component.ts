import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from './../dashboard.service';
import { SortEvent, Expense } from './../../core/models';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  expenses: any;
  observableChart: Observable<any>;
  size = 1;
  page = 0;
  sort = 'date,desc';
  pageSize = 10;
  monthYear = moment();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadExpenses();
    this.loadChart();
  }

  loadChart(): void {
    const monthYear = this.monthYear.format('YYYY-MM');
    this.observableChart = this.dashboardService.getChartLineSeries(monthYear);
  }

  loadExpenses(): void {
    const monthYear = this.monthYear.format('YYYY-MM');
    this.dashboardService.getExpenses(this.page, this.sort, this.pageSize, monthYear).subscribe((data) => {
      this.expenses = data.content;
      this.size = data.totalElements;
      this.pageSize = data.size;
    });
  }

  pageChange(page: number): void {
    this.page = page;
    this.loadExpenses();
  }

  monthYearChange(monthYear: any): void {
    this.monthYear = monthYear;
    this.page = 0;
    this.sort = 'date,desc';
    this.loadExpenses();
    this.loadChart();
  }

  updateSort({column, direction}: SortEvent): void {
    this.page = 0;
    this.sort = column && direction ? `${column},${direction}` : 'date,asc';

    this.loadExpenses();

  }

  addExpense(): void {
    this.dashboardService.openExpenseForm()
      .subscribe(() => {
        this.loadExpenses();
        this.loadChart();
      });
  }

  editExpense(expense: Expense): void {
    this.dashboardService.openExpenseForm(expense)
      .subscribe(() => {
        this.loadExpenses();
        this.loadChart();
      });
  }
}
