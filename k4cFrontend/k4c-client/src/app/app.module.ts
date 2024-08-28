import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {BasicAuthHtppInterceptorService} from "./auth/service/basic-auth-interceptor.service";
import {UpperCasePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
