import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthenticationResponse } from './../models/authentication.model';
import { AuthService } from './../auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('refresh-token') !== -1 || req.url.indexOf('login') !== -1) {
            return next.handle(req);
        }

        const token = this.authService.getToken();

        if (!token) {
            return next.handle(req);
        }

        return next.handle(this.addToken(req, token)).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 403) {
                return this.handleAuthErrors(req, next);
            } else {
                return throwError(error);
            }
        }));
    }

    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((authAuthenticationResponse: AuthenticationResponse) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject.next(authAuthenticationResponse.authenticationToken);

                    return next.handle(this.addToken(req, authAuthenticationResponse.authenticationToken));
                })
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter(result => result != null),
                take(1),
                switchMap((res) => next.handle(this.addToken(req, this.authService.getToken())))
            );
        }
    }

    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
    }
}
