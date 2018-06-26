import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieModule } from 'ngx-cookie';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AppRouter } from './app.router';
import {ToastyModule} from 'ng2-toasty';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    AppRouter,
    HttpModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    CookieModule.forRoot(),
    NgbModule.forRoot(),
    ToastyModule.forRoot()

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
