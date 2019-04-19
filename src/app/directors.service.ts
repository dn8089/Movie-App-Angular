import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

import { MessageService } from './message.service';

import { Director } from './director';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DirectorsService {

  private directorsUrl = 'http://localhost:61392/api/directors';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private location: Location
  ) { }

  /** GET directors from the server */
  getDirectors(): Observable<Director[]> {
    this.messageService.add('DirectorsService: fetches directors')
    return this.http.get<Director[]>(this.directorsUrl, { headers: { 'No-Auth': 'True' }})
      .pipe(
        tap(_ => this.log('fetched directors')),
        catchError(this.handleError<Director[]>('getDirectors', []))
      );
  }

  /** GET director by id from the server */
  getDirector(id: number): Observable<Director> {
    const url = `${this.directorsUrl}/${id}`;
    return this.http.get<Director>(url, { headers: { 'No-Auth': 'True' }})
      .pipe(
        tap(_ => this.log(`fetched director id=${id}`)),
        catchError(this.handleError<Director>(`getDirector id=${id}`))
      );
  }

  /** POST: add a new director to the server */
  addDirector (director: Director): Observable<Director> {
    return this.http.post<Director>(this.directorsUrl, director, httpOptions).pipe(
      tap((newDirector: Director) => this.log(`added director id=${newDirector.Id}`)),
      catchError(this.handleError<Director>('addDirector'))
    );
  }

  /** PUT: update the director on the server */
  updateDirector (id: number, director: Director): Observable<any> { //Observable<Director>
    const url = `${this.directorsUrl}/${id}`;
    return this.http.put(url, director, httpOptions).pipe(
      tap(_ => this.log(`updated director id=${director.Id}`)),
      catchError(this.handleError<any>('updateDirector'))
    );
  }

  /** DELETE: delete the director from the server */
  deleteDirector (id: number): Observable<Director> {
    const url = `${this.directorsUrl}/${id}`;

    return this.http.delete<Director>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted director id=${id}`)),
      catchError(this.handleError<Director>('deleteDirector'))
    );
  }

  goBack() : void {
    console.log('goBack');
    console.log(location);
    this.location.back();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a DirectorsService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`DirectorsService: ${message}`);
  }
}
