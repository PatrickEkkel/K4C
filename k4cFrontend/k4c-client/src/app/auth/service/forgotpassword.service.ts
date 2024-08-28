import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { PasswordReset } from "../models/password-reset"

@Injectable({ providedIn: 'root' })
export class ForgotpasswordService {

  baseUrl: string = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  public createRequest(email: String) {
    return this.httpClient.post<String>(this.baseUrl + "forgotpassword", email);
  }

  public saveNewPassword(passwords: PasswordReset) {
    return this.httpClient.post<PasswordReset>(this.baseUrl + "resetpassword", passwords);
  }
}
