import { Component, OnInit } from '@angular/core';
import { isLogged } from 'src/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  isLogged: boolean = isLogged();
  ngOnInit(): void {}
}
