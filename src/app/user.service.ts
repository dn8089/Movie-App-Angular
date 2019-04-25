import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:61392/';
  //@Output() isLoggedIn: EventEmitter<any> = new EventEmitter<any> ();
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  get isLoggedIn() {
    return; this.isLoggedIn
  }

  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.url}api/Account/Register`, user);
  }

  logIn(user: User): Observable<any> {
    var data = "username=" + user.Email + "&password=" + user.Password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    //this.loggedIn.next(true);
    return this.http.post(`${this.url}Token`, data, { headers: reqHeader });
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/logIn']);
  }
}
