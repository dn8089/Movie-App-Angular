import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:61392/';

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.url}api/Account/Register`, user);
  }

  logIn(user: User): Observable<any> {
    var data = "username=" + user.Email + "&password=" + user.Password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(`${this.url}Token`, data, { headers: reqHeader });
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/logIn']);
  }
}
