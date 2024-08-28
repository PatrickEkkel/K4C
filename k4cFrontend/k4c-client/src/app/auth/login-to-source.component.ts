import {Component, OnInit} from "@angular/core";
import {CompanyService} from "../companies/service/company.service";
import {Router} from "@angular/router";


@Component({
  selector: 'login-to-source',
  templateUrl: 'login-to-source.component.html',
})
export class LoginToSourceComponent implements OnInit {


  constructor(private companyService: CompanyService, private router: Router) {
  }

  ngOnInit(): void {


    this.companyService.resetImpersonate().subscribe(() => {
      this.router.navigate(['/companies']);
    });
  }

}
