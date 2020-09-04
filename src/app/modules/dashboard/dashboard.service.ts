import { Expense } from './../core/models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ExpenseFormModalComponent } from '../dashboard/components/expense-form-modal/expense-form-modal.component';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  bsModalRef: BsModalRef;

  constructor(private http: HttpClient, private modalService: BsModalService, private toastr: ToastrService) { }

  addExpense(): void{
    this.bsModalRef = this.modalService.show(ExpenseFormModalComponent);
    this.bsModalRef.content.submit.subscribe((expense: Expense) => {
      this.saveExpense(expense).subscribe(
        success => {
          this.bsModalRef.hide();
          this.toastr.success('Your expense was successfully created');
        },
        err => {
          this.toastr.error('Not was possible to create your expense');
        }
      );
    });
  }

  saveExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>('https://credit-card-control-dev-api.herokuapp.com/api/expenses', expense );
  }

  getExpenses(page: number, sort: string): Observable<any> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', '10');

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<any>('https://credit-card-control-dev-api.herokuapp.com/api/expenses', { params });
  }
}
