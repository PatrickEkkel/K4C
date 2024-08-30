import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {jwtDecode} from "jwt-decode";
import {User} from "../models";
import {environment} from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {

      let currentUser = sessionStorage.getItem('currentUser');
      if(currentUser != null) {this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(currentUser));
     }
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        //let currentUser = sessionStorage.getItem('currentUser');
        //this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(currentUser!!));
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/${environment.jwtLogin}`, { username, password })
            .pipe(
                map(response => {
                    // login successful if there's a jwt token in the response
                    let currentUser: User = new User();
                    if (response.access) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        currentUser = jwtDecode(response.access)
                        currentUser.token = response.access
                        currentUser.refreshToken = response.refresh
                        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                        this.currentUserSubject.next(currentUser);
                    }
                    return currentUser;
                }),
            )
            // .subscribe( data => console.log('data'), error => console.log('error'))
    }

    refreshToken() {
        console.log('this.currentUserValue.refreshToken')
        console.log(this.currentUserValue.refreshToken)
        const refreshToken = this.currentUserValue.refreshToken
        return this.http.post<any>(`${environment.apiUrl}/${environment.jwtRefresh}`, { 'refresh': refreshToken })
            .pipe(
                map(response => {
                    // login successful if there's a jwt token in the response
                    console.log('refresh')
                    console.log(response)
                    let currentUser: User = new User();
                    if (response.access) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        currentUser = jwtDecode(response.access)
                        currentUser.token = response.access
                        currentUser.refreshToken = response.refresh
                        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                        console.log(currentUser)
                        this.currentUserSubject.next(currentUser);
                    }
                    return currentUser;
                }),
            )
            // .subscribe( data => console.log('data'), error => console.warn(error))
    }

    logout() {
        // remove user from local storage to log user out
       try {

       }  catch (error) {
         // ignore ;-)
       }
       sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null!!);
    }
}
