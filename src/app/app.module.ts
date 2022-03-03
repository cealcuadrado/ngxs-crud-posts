import { environment } from './../environments/environment';

import { AppState } from './states/app.states';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { PostComponent } from './layout/post/post.component';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { ErrorHandleInterceptor } from './interceptors/error-handle.interceptor';
import { SetHttpsInterceptor } from './interceptors/set-https.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot(
      [AppState],
      { developmentMode: !environment.production }
    ),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: BaseUrlInterceptor,
    multi: true
    }, {
    provide: HTTP_INTERCEPTORS,
    useClass: SetHttpsInterceptor,
    multi: true
    },{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandleInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
