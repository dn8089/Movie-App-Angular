import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpUserEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { Router } from '@angular/router';
import { catchError, map } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(request);

        if (request.headers.get('No-Auth') === 'True') {
            console.log('if');
            return next.handle(request.clone());
        }

        var token = localStorage.getItem('userToken');
        console.log('Token: ' + token);

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        

            return next.handle(request);/*.pipe(
                map((event: HttpEvent<any>) => {
                    console.log('map!!!!');
                    console.log('event--->>>', event);
                    if (event instanceof HttpResponse) {
                        console.log('event--->>>', event);
                    }
                    if (event instanceof HttpErrorResponse) {
                        console.log('HttpErrorResponse--->>>', event);
                        if (event.status === 401)
                            this.router.navigateByUrl('/logIn');
                    }
                    return event;
                }),
                catchError((error: any) => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.status === 401)
                            this.router.navigateByUrl('/logIn');
                    }
                    
                    return throwError(error);
                })
            );*/
        } else {
            this.router.navigateByUrl('/logIn');
        }
    }
}
