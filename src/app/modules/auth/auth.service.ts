import { AuthenticationResponse } from './models/authentication.model';
import { LoginRequest } from './models/login.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserRequest } from './models/user.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  create(userRequest: UserRequest): Observable<any> {
    return this.httpClient.post('https://credit-card-control-dev-api.herokuapp.com/api/users', userRequest);
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.httpClient.post('https://credit-card-control-dev-api.herokuapp.com/api/auth/login', loginRequest)
      .pipe(map((data: AuthenticationResponse) => {
        localStorage.setItem('authenticationToken', data.authenticationToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('expiresAt', data.expiresAt);

        return true;
      }));
  }
}
