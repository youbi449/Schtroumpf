import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export interface Credentials {
  username: string;
  password: string;
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}
  error: string = '';
  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });
  registerForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  login(value: Credentials): void {
    this.auth.login(value).subscribe({
      error: (error) => this.openSnackBar(error),
      next: (response) => {
        const token = response.body?.token!;
        localStorage.setItem('token', token);
        this.router.navigate(['/']);
      },
    });
  }
  register(value: Credentials): void {
    this.auth.register(value).subscribe({
      error: (error) => this.openSnackBar(error),
      next: (response) => console.log(response),
    });
  }
  openSnackBar(message: string): void {
    this.snackbar.open(message, 'Fermer');
  }
  ngOnInit(): void {}
}
