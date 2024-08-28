import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, of, throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor(private router: Router,private authService: AuthenticationService) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow

    if(this.authService.isUserLoggedIn()) {
      if (err.status === 401 || err.status === 403) {
        //navigate to login
        this.authService.resetUserLogin();
        this.router.navigateByUrl(`/login`);
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        return of(err.message); // or EMPTY may be appropriate here
      }
    }

    return throwError(err);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      let token = sessionStorage.getItem('token')
      req = req.clone({
        setHeaders: {
          'Authorization':  token!
        },
      });
    }
    return next.handle(req).pipe(catchError(x=> this.handleAuthError(x)));
  }
}
