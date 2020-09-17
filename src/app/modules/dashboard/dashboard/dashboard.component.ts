import { Component, OnInit, OnChanges } from '@angular/core';
import { DashboardService } from './../dashboard.service';
import { Chart } from 'chart.js';
import { SortEvent, Expense } from './../../core/models';
import * as moment from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  expenses: any;
  size = 1;
  page = 0;
  sort = 'date,desc';
  pageSize = 10;
  monthYear = moment();
  chart = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    const monthYear = this.monthYear.format('YYYY-MM');
    this.dashboardService.getExpenses(this.page, this.sort, this.pageSize, monthYear).subscribe((data) => {
      this.expenses = data.content;
      this.size = data.totalElements;
      this.pageSize = data.size;
    });

    const days = [];
    const limit = [];

    for (let i = 0; i <= 15; i++) {
      days.push({
        x: i,
        y: i === 0 ? Math.random() * 100 : days[i - 1].y + Math.random() * 100
      });
    }


    for (let i = 0; i <= 30; i++) {
      limit.push({
        x: i,
        y: i === 0 ? Math.random() * 100 : limit[i - 1].y + 70
      });
    }

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: limit.map(day => day.x),
        datasets: [
          {
            label: this.monthYear.format('MMM, YYYY'),
            data: days,
            backgroundColor: '#fff',
            borderColor: [
                'rgba(19, 247, 228,1)',
            ],
            borderWidth: 2,
            pointBackgroundColor: 'rgba(19, 247, 228,1)',
            pointBorderColor: 'rgba(19, 247, 228,1)',
            pointBorderWidth: 5,
          },
          {
            label: 'limit',
            data: limit,
            backgroundColor: '#fff',
            borderColor: [
                'gray',
            ],
            borderWidth: 2,
            pointRadius: 0,
            borderDash: [5, 15]
          },
        ]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            }
          }],
          tooltips: {
            mode: 'index'
          },
       }
      }
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
  }

  updateSort({column, direction}: SortEvent): void {
    this.page = 0;
    this.sort = column && direction ? `${column},${direction}` : 'date,asc';

    this.loadExpenses();

  }

  addExpense(): void {
    this.dashboardService.openExpenseForm().subscribe(() => this.loadExpenses());
  }

  editExpense(expense: Expense): void {
    this.dashboardService.openExpenseForm(expense).subscribe(() => this.loadExpenses());
  }
}
