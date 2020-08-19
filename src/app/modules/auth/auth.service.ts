import { UserRequest } from './models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  create(userRequest: UserRequest): Observable<any> {
    return this.httpClient.post('https://credit-card-control-dev-api.herokuapp.com/api/users', userRequest);
  }
}
