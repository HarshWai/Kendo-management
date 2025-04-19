import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';  // ✅ Use this

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient()  // ✅ This is enough!
    , // ✅ This is not needed here
    provideHttpClient(withFetch()),
  ],
};
