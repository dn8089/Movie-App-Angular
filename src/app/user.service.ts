import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:61392/api/Account/';

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.url}Register`, user)
    .pipe(
      catchError(this.handleError<any>('registerUser'))    
      //catchError(err => of(err))
    );
  }

  logIn() {

  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
