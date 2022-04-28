import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { parseJwt } from 'src/utils';
import { HomeLoggedService } from './home-logged.service';

@Component({
  selector: 'app-home-logged',
  templateUrl: './home-logged.component.html',
  styleUrls: ['./home-logged.component.css'],
})
export class HomeLoggedComponent implements OnInit {
  constructor(
    private service: HomeLoggedService,
    private snackbar: MatSnackBar
  ) {}
  schtroumpf: any = [];
  user: any = parseJwt();

  changeRole(value: any) {
    this.service
      .changeRole(this.user.id, value)
      .subscribe(() =>
        this.openSnackBar('Changement pris en compte merci de vous reconnecter')
      );
  }

  addToFriend(idToAdd: string) {
    this.service.addToFriendList(idToAdd).subscribe((response) => {
      window.location.reload();
    });
  }
  deleteFriend(idToDelete: string) {
    this.service.removeFromFriendList(idToDelete).subscribe((response) => {
      window.location.reload();
    });
  }
  ngOnInit(): void {
    this.service.getAllUser().subscribe((users) => {
      this.schtroumpf = users;
    });
    this.service.getLoggedUserDetails().subscribe((details) => {
      this.user = details;
      console.log(this.user);
    });
  }
  openSnackBar(message: string): void {
    this.snackbar.open(message, 'Fermer');
  }
  isUserInFriendList(userIdAsked: string) {
    return this.user.friendList.includes(userIdAsked) ? true : false;
  }
}
