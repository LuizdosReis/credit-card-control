import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRequest } from './models/user.model';
import { AuthenticationResponse } from './models/authentication.model';
import { LoginRequest } from './models/login.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  refreshTokenRequest = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsername()
  };

  constructor(private httpClient: HttpClient) { }

  create(userRequest: UserRequest): Observable<any> {
    return this.httpClient.post('/api/users', userRequest);
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.httpClient.post('/api/auth/login', loginRequest)
      .pipe(map((data: AuthenticationResponse) => {
        this.storeAuthentication(data);
        return true;
      }));
  }

  getToken(): string {
    return localStorage.getItem('authenticationToken');
  }

  private getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
  }

  private getUsername(): string {
    return localStorage.getItem('username');
  }

  refreshToken(): Observable<AuthenticationResponse> {
    return this.httpClient.post('api/auth/refresh-token', this.refreshTokenRequest)
      .pipe(tap((data: AuthenticationResponse) => {
        this.clearLocalStore();
        this.storeAuthentication(data);
      }));
  }

  storeAuthentication(data: AuthenticationResponse): void {
    localStorage.setItem('authenticationToken', data.authenticationToken);
    localStorage.setItem('username', data.username);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('expiresAt', data.expiresAt);
  }

  private clearLocalStore(): void {
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
  }

  logout(): void {
    this.clearLocalStore();
  }
}
