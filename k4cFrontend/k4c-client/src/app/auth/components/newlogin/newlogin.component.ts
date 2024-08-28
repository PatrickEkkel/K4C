import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, UpperCasePipe} from "@angular/common";;


@Component({
  selector: 'newapp-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, UpperCasePipe, CommonModule],
  templateUrl: './newlogin.component.html',
  styleUrls: ['./newlogin.component.css']
})
export class NewloginComponent implements OnInit {

  @Input() username: String = "";
  password: String = ''
  invalidLogin = false;
  @Input() error: string | null = '';


  constructor(private router: Router,
              private loginservice: AuthenticationService) {

  }

  ngOnInit(): void {
  }

  checkLogin() {

    (this.loginservice.authenticate(this.username, this.password, false).subscribe(
        (data: any) => {
          if (!data.mfaChallenge) {
            this.router.navigate(['/mfa/auth']);
          } else {
            this.router.navigate(['/dashboard']);
          }
          this.invalidLogin = false
        },
        (error: any) => {
          this.loginservice.clearRememberUser();
          this.invalidLogin = true
          this.error = error.message;
        }
      )
    );

  }
}
