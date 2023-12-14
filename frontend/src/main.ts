import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import{provideHttpClient} from '@angular/common/http';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { routes } from './app/router';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app/app.component';
import {  NgxSpinnerModule } from 'ngx-spinner';
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


bootstrapApplication(AppComponent,{
  providers:[
    provideHttpClient(),
    importProvidersFrom(BrowserModule,
      CommonModule,
      BrowserAnimationsModule,
      NgxSpinnerModule,
      SweetAlert2Module,
      ToastrModule.forRoot({
        closeButton:true,
        progressBar:true
      }),
      RouterModule.forRoot(routes))
  ]
})
