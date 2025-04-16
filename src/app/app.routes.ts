import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LeadManagementComponent } from './lead-management/lead-management.component';

export const routes = [
    { path: '', component: MainComponent },
    { path: 'lead-management', component: LeadManagementComponent },

    // Add more routes here as needed
];

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes)
    ]
}).catch(err => console.error(err));
