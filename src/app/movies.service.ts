import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

import { MessageService } from './message.service';

import { Movie } from './movie';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private moviesUrl = 'http://localhost:61392/api/movies';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private location: Location
  ) { }

  /** GET movies from the server */
  getMovies(): Observable<Movie[]> {
    this.messageService.add('MoviesService: fetches movies');
    return this.http.get<Movie[]>(this.moviesUrl)
      .pipe(
        tap(_ => this.log('fetched movies')),
        catchError(this.handleError<Movie[]>('getMovies', []))
      );
  }

  /** GET movie by id from the server */
  getMovie(id: number): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(url)
      .pipe(
        tap(_ => this.log(`fetched movie id=${id}`)),
        catchError(this.handleError<Movie>('getMovie'))
      );
  }

  /** POST: add a new movie to the server */
  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesUrl, movie, httpOptions)
      .pipe(
        tap((newMovie: Movie) => this.log(`added movie id=${newMovie.Id}`)),
        catchError(this.handleError<Movie>('addMovie'))
      );
  }

  /** PUT: update the movie on the server */
  updateMovie(id: number, movie: Movie): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.put<Movie>(url, movie, httpOptions)
      .pipe(
        tap(updatedMovie => this.log(`updated movie id=${updatedMovie.Id}`)),
        catchError(this.handleError<Movie>('updateMovie'))
      );
  }

  /** DELETE: delete the movie from the server */
  deleteMovie(id: number): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.delete<Movie>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted movie id=${id}`)),
        catchError(this.handleError<Movie>('deleteMovie'))
      );
  }

  goBack() : void {
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
    this.messageService.add(`MoviesService: ${message}`);
  }
}
