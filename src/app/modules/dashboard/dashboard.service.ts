import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

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
