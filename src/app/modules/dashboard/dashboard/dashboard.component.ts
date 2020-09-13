import { Component, OnInit } from '@angular/core';
import { DashboardService } from './../dashboard.service';
import { SortEvent, Expense } from './../../core/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  expenses: any;
  size = 1;
  page = 0;
  sort: string;
  pageSize = 10;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.dashboardService.getExpenses(this.page, this.sort, this.pageSize).subscribe((data) => {
      this.expenses = data.content;
      this.size = data.totalElements;
      this.pageSize = data.size;
    });
  }

  pageChange(page: number): void {
    this.page = page;
    this.loadExpenses();
  }

  updateSort({column, direction}: SortEvent): void {
    this.page = 0;
    this.sort = column && direction ? `${column},${direction}` : '';

    this.loadExpenses();

  }

  addExpense(): void {
    this.dashboardService.openExpenseForm().subscribe(() => this.loadExpenses());
  }

  editExpense(expense: Expense): void {
    this.dashboardService.openExpenseForm(expense).subscribe(() => this.loadExpenses());
  }
}
