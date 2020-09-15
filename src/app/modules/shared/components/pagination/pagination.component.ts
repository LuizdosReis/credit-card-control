import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { map, filter, toArray, tap } from 'rxjs/operators';
import { Observable, range } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() currentPage = 0;
  @Input() limit = 1;
  @Input() size = 1;
  @Input() range = 3;
  totalPages = 1;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: Observable<number[]>;

  constructor() { }

  ngOnInit(): void {
    this.getPages(this.currentPage, this.limit, this.size);
  }

  ngOnChanges(): void {
    this.getPages(this.currentPage, this.limit, this.size);
  }

  private getTotalPages(limit: number, size: number): number {
    return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
  }

  getPages(currentPage: number, limit: number, size: number): void {
    this.totalPages = this.getTotalPages(limit, size);
    this.pages = range(-this.range, this.range * 2 + 1).pipe(
      map(off => currentPage + off),
      filter(page => this.isValidPageNumber(page, this.totalPages)),
      toArray(),
    );
  }

  private isValidPageNumber(page: number, totalPages: number): boolean {
    return page >= 0 && page < totalPages;
  }

  selectPage(page: number, event): void {
    this.cancelEvent(event);
    if (this.isValidPageNumber(page, this.totalPages)) {
      this.pageChange.emit(page);
    }
  }

  cancelEvent(event): void {
    event.preventDefault();
  }
}
