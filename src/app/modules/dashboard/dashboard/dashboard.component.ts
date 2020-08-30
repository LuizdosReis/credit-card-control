import { Component, OnInit, Directive, Input, Output, EventEmitter, ViewChildren, QueryList, HostListener, HostBinding } from '@angular/core';
import { DashboardService } from './../dashboard.service';

interface Expense {
  id: number;
  date: Date;
  value: number;
}

export type SortColumn = keyof Expense | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { asc: 'desc', desc: '', '': 'asc' };

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}
@Directive({
  selector: 'th[sortable]'
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  @HostBinding('class.asc') get asc(): boolean {
    return this.direction === 'asc';
  }

  @HostBinding('class.desc') get desc(): boolean {
    return this.direction === 'desc';
  }

  @HostListener('click')
  onSort(): void {
    this.direction = rotate[this.direction];

    this.sort.emit({column: this.sortable, direction: this.direction});
 }
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  expenses: any;
  size: number;
  page = 0;
  sort: string;
  pageSize: number;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.dashboardService.getExpenses(this.page, this.sort).subscribe((data) => {
      this.expenses = data.content;
      this.size = data.totalElements;
      this.pageSize = data.size;
    });
  }

  pageChange(page: number): void {
    this.page = page - 1;
    this.loadExpenses();
  }

  onSort({column, direction}: SortEvent): void {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.page = 0;
    this.sort = column && direction ? `${column},${direction}` : '';

    this.loadExpenses();

  }
}
