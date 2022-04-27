import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackbar: MatSnackBar
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

  login(value: Credentials): void {}
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
