import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {UpperCasePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BasicAuthHtppInterceptorService} from "./auth/service/basic-auth-interceptor.service";

@NgModule({

  imports: [
    UpperCasePipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
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
