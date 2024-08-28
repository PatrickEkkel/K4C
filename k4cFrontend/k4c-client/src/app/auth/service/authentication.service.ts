import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {UserDetails} from "../models/userdetails";
import {environment} from "../../../environments/environment";


export class User {

  userDetails: UserDetails = new UserDetails();

  constructor(public status: string) {}
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {

  baseUrl: string = environment.apiUrl

  constructor(private httpClient: HttpClient) {}
// Provide username and password for authentication, and once authentication is successful,
//store JWT token in session
  authenticate(username: any, password: any, rememberMe: boolean) {

    if(rememberMe) {
      localStorage.setItem("rememberUser",username);
      localStorage.setItem("rememberMe",'true');
    }

    return this.httpClient
      .post<any>(this.baseUrl + "authenticate", { username, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem("mfaChallenge",userData.mfaChallenge);
          sessionStorage.setItem("username", username);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("image",userData.image)
          sessionStorage.setItem("gravatar",userData.gravatar)
          sessionStorage.setItem("displayName",userData.name)
          return userData;
        })
      )
  }

  verify(token: string) {
    let url = this.baseUrl + 'api/auth/verify';
    return this.httpClient.post(url, token);
  }
  getRememberedUsername(): String | null {
    return localStorage.getItem("rememberUser");
  }

  isUserRemembered() {
    return localStorage.getItem('rememberMe') == 'true';
  }
  clearRememberUser() {
    localStorage.removeItem("remember");
    localStorage.removeItem("rememberMe");
  }

  getDisplayName() {
    return sessionStorage.getItem("displayName");
  }
  getImage() {
    return sessionStorage.getItem("image");
  }
  usesGravatar(): Boolean | false {
    return (sessionStorage.getItem("gravatar") == 'true');
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    let mfaChallenge = sessionStorage.getItem("mfaChallenge");
    return !(user === null) && mfaChallenge !== 'false';
  }

  resetUserLogin() {
    sessionStorage.removeItem("username")
  }

  logOut() {
    let url = '/api/auth/logout';
    return this.httpClient.get(url);
  }
}
