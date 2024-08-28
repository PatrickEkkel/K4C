import {Injectable} from "@angular/core";
import {Company} from "../../companies/company";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserDetails} from "../../users/models/Userdetails";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.apiUrl + 'api/auth/'

  constructor(private httpClient: HttpClient) {
  }

  getLoggedInCompany() {
    let loggedInCompany = this.baseUrl + 'company';
    return this.httpClient.get<Company>(loggedInCompany);
  }

  getLoggedInUser() {
    let loggedInUser = this.baseUrl + 'user';
    return this.httpClient.get<UserDetails>(loggedInUser);
  }

}
