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

  openExpenseForm(expense?: Expense): void{
    this.bsModalRef = this.modalService.show(ExpenseFormModalComponent, { initialState: { expense }});
    this.bsModalRef.content.submit.subscribe((updateExpense: Expense) => {
      this.saveExpense({...expense, ...updateExpense}).subscribe(
        success => {
          this.bsModalRef.hide();
          this.toastr.success(`Your expense was successfully ${expense ? 'updated ' : 'created'}`);
        },
        err => {
          this.toastr.error('Not was possible to create your expense');
        }
      );
    });
    this.bsModalRef.content.remove.subscribe((id: number) => {
      this.removeExpense(id).subscribe(
        success => {
          this.bsModalRef.hide();
          this.toastr.success('Your expense was successfully removed');
        },
        err => {
          this.toastr.error('Not was possible to remove your expense');
        }
      );
    });
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
