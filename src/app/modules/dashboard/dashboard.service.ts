import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseFormModalComponent } from '../dashboard/components/expense-form-modal/expense-form-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  getExpenses(page: number, sort: string): Observable<any> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', '10');

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<any>('https://credit-card-control-dev-api.herokuapp.com/api/expenses', { params });
  }

  addExpense(): void{
    this.modalService.open(ExpenseFormModalComponent, { centered: true }).result.then((result) => {
    }, (reason) => {
    });


  }
}
