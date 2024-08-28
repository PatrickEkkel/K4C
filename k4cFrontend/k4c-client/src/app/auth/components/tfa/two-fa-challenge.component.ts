import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'two-fa-callenge',
  templateUrl: 'twofa-challenge.component.html',
  styleUrls: ['./two-fa-challenge.component.css']
})
export class TwoFaChallengeComponent  {

  mfaForm: FormGroup;

  verify: boolean | null

  constructor(private authService: AuthenticationService, private router: Router) {
    this.mfaForm = new FormGroup({})
  }

  onSubmit() {
    this.mfaForm.markAllAsTouched();
    if(this.mfaForm.valid) {

      this.authService.verify(this.mfaForm.value.challenge).subscribe(result => {
        if(result) {
          sessionStorage.setItem("mfaChallenge","true");
          this.router.navigate(['/dashboard']);
        } else {
          this.verify = false;
        }
      });
    }
  }
}
