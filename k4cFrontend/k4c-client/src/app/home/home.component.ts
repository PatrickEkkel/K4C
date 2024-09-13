import {Component, OnInit} from '@angular/core';
import {User} from "../auth/models";
import {UserService} from "../auth/service/user.service";
import {AuthenticationService} from "../auth/service/authentication.service";
import {TestService} from "../test/test-service";
import {MenuComponent} from "../common/menu/menu.component";



@Component({
  templateUrl: 'home.component.html',
  standalone: true,
  imports: [
    MenuComponent
  ]
})
export class HomeComponent implements OnInit {
    users: User[] = [];

    token: string = "";

    constructor(private userService: UserService, private authService: AuthenticationService, private testService: TestService) { }

    ngOnInit() {
        // this.userService.getAll().pipe(first()).subscribe(users => {
        //     this.users = users;
        // });
      console.log(this.authService.currentUserValue);
      this.token = this.authService.currentUserValue.token!!;

      this.testService.getData().subscribe(x => {
        console.log(x);
      });
    }

    getToken() {

    }
}
