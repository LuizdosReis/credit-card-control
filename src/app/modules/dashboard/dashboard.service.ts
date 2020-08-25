import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<any> {
    return this.http.get<any>('https://credit-card-control-dev-api.herokuapp.com/api/expenses');
  }
}
