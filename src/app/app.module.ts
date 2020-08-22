import { CoreModule } from './modules/core/core.module';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoaderInterceptorServiceService } from './interceptors/loader-interceptor-service.service';
import { LoaderComponent } from './interceptors/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    AuthModule,
    CoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      progressBar: true,
      closeButton: true
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorServiceService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
