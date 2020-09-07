import { SortableHeaderDirective } from './../../../core/directives/sortable-header.directive';
import { Component, OnInit, Input, Output, EventEmitter, QueryList, ViewChildren } from '@angular/core';
import { Expense, SortEvent } from '../../../core/models';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  @Input() expenses: Expense[];

  @Output() sortChange = new EventEmitter<SortEvent>();
  @Output() editExpense = new EventEmitter<Expense>();

  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  constructor() { }

  ngOnInit(): void {
  }

  onSort(sortEvent: SortEvent): void {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.appSortable !== sortEvent.column) {
        header.direction = '';
      }
    });

    this.sortChange.emit(sortEvent);
  }
}
