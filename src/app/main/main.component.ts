import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-main',
  imports: [ButtonModule, NgClass],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  selectedButton: string = 'Lead Management';

  selectButton(name: string): void {
    this.selectedButton = name;
  }
}
