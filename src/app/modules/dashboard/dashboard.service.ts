import { Expense } from './../core/models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, merge } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ExpenseFormModalComponent } from '../dashboard/components/expense-form-modal/expense-form-modal.component';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  bsModalRef: BsModalRef;

  constructor(private http: HttpClient, private modalService: BsModalService, private toastr: ToastrService) { }

  openExpenseForm(expense?: Expense): Observable<any> {
    this.bsModalRef = this.modalService.show(ExpenseFormModalComponent, { initialState: { expense }});
    const submit = this.bsModalRef.content.submit.pipe(
      map((updateExpense: Expense) => ({...expense, ...updateExpense})),
      switchMap((updatedExpense: Expense) => this.saveExpense(updatedExpense)),
      tap({
        next: next => {
          this.bsModalRef.hide();
          this.toastr.success(`Your expense was successfully ${expense ? 'updated ' : 'created'}`);
        },
        error: err => {
          this.toastr.error('Not was possible to create your expense');
        }
      }),
      take(1)
    );

    const remove = this.bsModalRef.content.remove.pipe(
      switchMap((id: number) => this.removeExpense(id)),
      tap({
        next: next => {
          this.bsModalRef.hide();
          this.toastr.success('Your expense was successfully removed');
        },
        error: err => {
          this.toastr.error('Not was possible to remove your expense');
        }
      }),
      take(1)
    );

    return merge(remove, submit, 2);
  }

  removeExpense(id: number): Observable<void> {
    return this.http.delete<void>(`https://credit-card-control-dev-api.herokuapp.com/api/expenses/${id}`);
  }

  saveExpense(expense: Expense): Observable<Expense> {
    if (expense.id) {
      return this.http.put<Expense>(`https://credit-card-control-dev-api.herokuapp.com/api/expenses/${expense.id}`, expense );
    }

    return this.http.post<Expense>('https://credit-card-control-dev-api.herokuapp.com/api/expenses', expense );
  }

  getExpenses(page: number, sort: string, pageSize: number): Observable<any> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<any>('https://credit-card-control-dev-api.herokuapp.com/api/expenses', { params });
  }
}
