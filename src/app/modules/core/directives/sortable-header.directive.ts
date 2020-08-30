import { Directive, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { SortDirection, SortColumn, SortEvent } from '../models';

const rotate: {[key: string]: SortDirection} = { asc: 'desc', desc: '', '': 'asc' };

@Directive({
  selector: 'th[appSortable]'
})
export class SortableHeaderDirective {

  constructor() { }

  @Input() appSortable: SortColumn = '';
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

    this.sort.emit({column: this.appSortable, direction: this.direction});
  }
}
