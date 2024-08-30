import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {LoginComponent} from "./auth/components/login";

export const routes: Routes = [
  { path: '',component: LoginComponent },
  { path: 'login', component: LoginComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
