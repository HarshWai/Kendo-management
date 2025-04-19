/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
importProvidersFrom(BrowserAnimationsModule);
// bootstrapApplication(AppComponent, appConfig){

// }
//   .catch ((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
}).catch((err) => console.error(err));

