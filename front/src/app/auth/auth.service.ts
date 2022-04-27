import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Credentials } from './auth.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(credentials: Credentials) {
    const { username, password } = credentials;
    return this.http
      .post(
        'http://localhost:5000/api/register',
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
}
