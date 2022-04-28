import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Credentials } from './auth.component';
interface LoginToken {
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(credentials: Credentials) {
    const { username, password } = credentials;
    return this.http
      .post(
        'http://localhost:5000/api/auth/register',
        {
          username,
          password,
        },
        { observe: 'response' }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const { error: msgError } = error.error;
          return throwError(() => new Error(msgError));
        })
      );
  }
  login(credentials: Credentials) {
    return this.http
      .post<LoginToken>(
        'http://localhost:5000/api/auth/',
        { ...credentials },
        { observe: 'response' }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const { error: msgError } = error.error;
          return throwError(() => new Error(msgError));
        })
      );
  }
}
