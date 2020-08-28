import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  expenses: any;
  size: number;
  page: number = 0;
  pageSize: number;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadExpenses(this.page);
  }

  loadExpenses(page: number): void {
    this.dashboardService.getExpenses(page).subscribe((data) => {
      this.expenses = data.content;
      this.size = data.totalElements;
      this.pageSize = data.size;
      this.page = data.pageable.pageNumber + 1;
    });
  }

  pageChange(page: number): void {
    this.loadExpenses(page - 1);
  }
}
