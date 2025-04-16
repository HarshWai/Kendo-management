import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { Router } from '@angular/router';
import { LeadManagementComponent } from '../lead-management/lead-management.component';

@Component({
  selector: 'app-main',
  imports: [ButtonModule, NgClass, LeadManagementComponent, NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  selectedButton: string = 'Lead Management';

  constructor(private router: Router) { }

  selectButton(name: string): void {
    this.selectedButton = name;
    if (name === 'Lead Management') {
      this.router.navigate(['/lead-management']);
    }
  }
}
