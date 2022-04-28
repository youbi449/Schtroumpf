import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isLogged } from 'src/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  isLogged: boolean = isLogged();

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']).then(() => window.location.reload());
  }
  ngOnInit(): void {}
}
