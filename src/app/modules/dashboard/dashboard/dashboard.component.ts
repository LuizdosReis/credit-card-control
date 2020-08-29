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

  @HostListener('click', ['$event.target'])
  onSort(event: any): void {
    this.direction = rotate[this.direction];

    // this.class = this.direction;

    console.log('onSort');
    console.log(this.direction);
    console.log(this.sortable);

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
  pageSize: number;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

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

  sort({column, direction}: SortEvent): void {

    console.log(column);
    console.log(direction);

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });


  }
}
