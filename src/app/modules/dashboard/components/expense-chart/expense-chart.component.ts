import { Component, Input, OnInit, ViewChild} from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.scss']
})
export class ExpenseChartComponent implements OnInit {

  @Input() chartSeries: any;

  value: number;
  valueGoal: number;

  @ViewChild('chart', { static: false }) chart: ChartComponent;
  public chartOptions: Partial<any>;

  constructor() { }

  ngOnInit(): void {


    const expenseGoals = this.chartSeries?.expenseGoals;
    const expenses = this.chartSeries?.expenses;

    this.value = expenses[expenses.length - 1].sum;
    this.valueGoal = expenseGoals[expenseGoals.length - 1].sum;

    this.chartOptions = {
      series: [
        {
          name: 'Daily Expenses',
          data: expenses.map(expense => expense.sum)
        },
        {
          name: 'Daily Goal Expenses',
          data: expenseGoals.map(expense => expense.sum)
        }
      ],
      tooltip: {
        custom: ({ series, seriesIndex, dataPointIndex, w }) => w.globals.labels[dataPointIndex]
      },
      chart: {
        type: 'line',
        events: {
          mouseMove: (event, chartContext, config) => {
            if ( config.dataPointIndex === -1 ) {
              this.value = expenses[expenses.length - 1].sum;
              this.valueGoal = expenseGoals[expenseGoals.length - 1].sum;
              return;
            }

            this.value = expenses[config.dataPointIndex]
              ? expenses[config.dataPointIndex].sum
              : expenses[expenses.length - 1].sum;
            this.valueGoal = expenseGoals[config.dataPointIndex].sum;
          }
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [5, 7, 5],
        curve: 'smooth',
        dashArray: [0, 8]
      },
      xaxis: {
        type: 'number',
        show: false,
        labels: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      grid: {
        show: false
      },
      colors: ['#77B6EA', '#545454'],
    };
  }

}
