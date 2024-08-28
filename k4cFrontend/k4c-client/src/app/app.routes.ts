import { Routes } from '@angular/router';
import {NewloginComponent} from "./auth/components/newlogin/newlogin.component";
import {LogoutComponent} from "./auth/components/logout/logout.component";
import {AuthGuardService} from "./auth/service/auth-guard.service";

export const routes: Routes = [
  { path: '',component: NewloginComponent},
  { path: 'login', component: NewloginComponent },
  { path: 'logout', component: LogoutComponent,canActivate:[AuthGuardService] },
];
