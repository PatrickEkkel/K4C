import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {BasicAuthHtppInterceptorService} from "./auth/service/basic-auth-interceptor.service";
import {UpperCasePipe} from "@angular/common";
import {NewloginComponent} from "./auth/components/newlogin/newlogin.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({

  imports: [
    UpperCasePipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    NewloginComponent,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BasicAuthHtppInterceptorService, multi: true,
  },
  ],
  exports: [
  ],
  bootstrap: []
})
export class AppModule {
}
