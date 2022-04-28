import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parseJwt } from 'src/utils';

@Injectable({
  providedIn: 'root',
})
export class HomeLoggedService {
  constructor(private http: HttpClient) {}
  user: any = parseJwt();
  getAllUser() {
    return this.http.get('http://localhost:5000/api/user');
  }
  changeRole(userId: string, role: string) {
    return this.http.post('http://localhost:5000/api/user/update', {
      userId,
      role,
    });
  }

  addToFriendList(userIdAsked: string) {
    return this.http.post('http://localhost:5000/api/user/add', {
      userId: this.user.id,
      userAsked: userIdAsked,
    });
  }
  removeFromFriendList(userIdAsked: string) {
    return this.http.post('http://localhost:5000/api/user/delete', {
      userId: this.user.id,
      userAsked: userIdAsked,
    });
  }
  getLoggedUserDetails() {
    return this.http.get('http://localhost:5000/api/user/' + this.user.id);
  }
}
