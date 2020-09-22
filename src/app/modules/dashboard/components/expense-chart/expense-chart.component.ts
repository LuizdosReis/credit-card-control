import { Component, OnInit, ViewChild} from '@angular/core';

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

  value: number;
  valueGoal: number;

  @ViewChild('chart', { static: false }) chart: ChartComponent;
  public chartOptions: Partial<any>;

  constructor() { }

  ngOnInit(): void {

    const dailyExpenses = [10.00, 10.00, 802.22, 802.22, 802.22, 991.29,
      991.29, 991.29, 1039.29, 1214.10, 1224.00, 1241.00, 1315.66, 1325.66, 1328.16, 1328.16, 1328.16];

    const dailyGoalExpenses =  [ 47.82, 95.64, 143.46, 191.28, 239.1, 286.92, 334.74, 382.56, 430.38, 478.2, 526.02, 573.84, 621.66,
      669.48, 717.3, 765.12, 812.94, 860.76, 908.58, 956.4, 1004.22, 1052.04, 1099.86,
      1147.68, 1195.5, 1243.32, 1291.14, 1338.96, 1386.78, 1434.6];

    this.value = dailyExpenses[dailyExpenses.length - 1];
    this.valueGoal = dailyGoalExpenses[dailyExpenses.length - 1];

    this.chartOptions = {
      series: [
        {
          name: 'Daily Expenses',
          data: dailyExpenses
        },
        {
          name: 'Daily Goal Expenses',
          data: dailyGoalExpenses
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
              this.value = dailyExpenses[dailyExpenses.length - 1];
              this.valueGoal = dailyGoalExpenses[dailyExpenses.length - 1];
              return;
            }

            this.value = dailyExpenses[config.dataPointIndex]
              ? dailyExpenses[config.dataPointIndex]
              : dailyExpenses[dailyExpenses.length - 1];;
            this.valueGoal = dailyGoalExpenses[config.dataPointIndex];
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
