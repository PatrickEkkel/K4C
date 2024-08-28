import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../service/authentication.service";
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String = "";
  password: String = ''
  invalidLogin = false

  rememberMe: boolean = false

  @Input() error: string | null;

  constructor(private router: Router,
              private translationService: TranslocoService,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
    this.translationService.setActiveLang("NL");
    if(this.loginservice.isUserRemembered()) {
      this.username = this.loginservice.getRememberedUsername()!!;
    }
  }

  checkLogin() {

    (this.loginservice.authenticate(this.username, this.password,this.rememberMe).subscribe(
      (data: any) => {
        if(!data.mfaChallenge) {
          this.router.navigate(['/mfa/auth']);
        } else {
          this.router.navigate(['/dashboard']);
        }
        this.invalidLogin = false
      },
      (error: any)  => {
        this.loginservice.clearRememberUser();
        this.invalidLogin = true
        this.error = error.message;
      }
    )
    );

  }

}
