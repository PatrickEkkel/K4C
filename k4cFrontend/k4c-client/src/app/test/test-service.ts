
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthenticationService} from "../auth/service/authentication.service";

@Injectable({
  providedIn: 'root',
})
export class TestService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthenticationService) {

  }


  getData() {
    let token = this.authService.currentUserValue.token;
    const headers = { 'Authorization': 'Bearer ' +  this.authService.currentUserValue.token!!}
    return this.http.get<any>(this.baseUrl + '/get-data', { headers });
  }

}
