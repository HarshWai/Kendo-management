import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  GridModule,
  ExcelModule,
  KENDO_GRID,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
  GridDataResult,
} from '@progress/kendo-angular-grid';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { DropDownListModule, KENDO_DROPDOWNLIST, KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms';
import { KENDO_BUTTONS, KENDO_DROPDOWNBUTTON } from '@progress/kendo-angular-buttons';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { ProductserviceService } from './productservice.service';
import { Data } from '@angular/router';
import { State, process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-lead-management',
  standalone: true,
  templateUrl: './lead-management.component.html',
  styleUrls: ['./lead-management.component.css'],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    ExcelExportModule,
    KENDO_GRID,
    KENDO_GRID_EXCEL_EXPORT,
    KENDO_GRID_PDF_EXPORT,
    KENDO_INPUTS,
    KENDO_DROPDOWNLIST,
    KENDO_DROPDOWNS,
    DropDownListModule,
    KENDO_BUTTONS,
    FormsModule,
    HttpClientModule,
    DropDownListModule,
    KENDO_DROPDOWNBUTTON,



  ]
})
export class LeadManagementComponent implements OnInit {
  public gridData: any[] = [];
  public gridView: any[] = [];
  public mySelection: number[] = [];
  public searchTerm: string = '';
  public isCreating = false;
  public newRecord: any = {};
  public editedRecords: Set<number> = new Set();
  selectedPreference: string | null = null;
  preferences: string[] = [];

  columnOrder: string[] = [];

  public areaData: any[] = [
    { text: 'View Lead', value: 'viewLead' },
    { text: 'Edit Lead', value: 'editLead' },
    { text: 'Assign to Sales Rep', value: 'assignSalesRep' },
    { text: 'Schedule Appointment', value: 'scheduleAppointment' },
    { text: 'Possible Matches', value: 'possibleMatches' },
    { text: 'Tie and Untie Qualified Leads', value: 'tieUntieLeads' },
    { text: 'Audit Trail', value: 'auditTrail' },
    { text: 'Estimates', value: 'estimates' },
    { text: 'Lead Documents', value: 'leadDocuments' },
    { text: 'Register With STS', value: 'registerSTS' },
    { text: 'Survey List', value: 'surveyList' },
    { text: 'Duplicate Lead', value: 'duplicateLead' },
    { text: 'Chat', value: 'chat' },
  ];
  public gridState: State = {
    skip: 0,
    take: 10,
    sort: [],
    filter: undefined
  };

  public gridResult: GridDataResult = {
    data: [],
    total: 0
  };

  constructor(
    private productService: ProductserviceService,
    private http: HttpClient,
    private elRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.loadPreferences();
  }

  getAllProducts(): void {
    this.productService.getAllproducts().subscribe({
      next: (data: any[]) => {
        this.gridData = data.map(item => ({
          ...item,
          isNew: false,
          isEditing: false
        }));

        // Apply state if stored
        const savedState = localStorage.getItem('gridState');
        if (savedState) {
          this.gridState = JSON.parse(savedState);
        }

        this.loadGridView();
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }
  loadGridView(): void {
    this.gridResult = process(this.gridData, this.gridState);
  }
  loadPreferences(): void {
    this.productService.getPreferences().subscribe((data) => {
      this.preferences = data.map((pref) => pref.name);  // Assuming preference has 'name' property
    });
  }
  public onStateChange(state: State): void {
    this.gridState = state;
    this.loadGridView();
    localStorage.setItem('gridState', JSON.stringify(state));
  }



  onCreate(): void {
    if (this.isCreating) return;
    this.isCreating = true;

    this.newRecord = {
      last_name: '',
      first_name: '',
      email: '',
      phone_type: '',
      appointment_type: '',
      assigned_date: '',
      sales_rep: '',
      coordinator: '',
      lmp_id: '',
      booking_agency: '',
      sync_to_mobile: false,
      mobile_sync_status: '',
      created_sources: '',
      effective_date: '',
      valid_through: '',
      isNew: true,
      isEditing: false
    };

    this.gridData = [this.newRecord, ...this.gridData];
    this.gridView = [...this.gridData];
  }

  filterGrid(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.gridView = [...this.gridData]; // Reset if search is empty
      return;
    }

    this.gridView = this.gridData.filter(item =>
      Object.keys(item).some(key =>
        item[key]?.toString().toLowerCase().includes(term)
      )
    );
  }
  // In your component.ts file, control editing manually
  public editRow(item: any): void {
    this.gridData.forEach(i => i.isEditing = false); // close others
    item.isEditing = true;
  }

  public saveRow(item: any): void {
    item.isEditing = false;

    // Call the service to update the data in db.json
    this.productService.updateProduct(item.id, item).subscribe({
      next: (response) => {
        console.log('Data saved successfully!', response);
      },
      error: (err) => {
        console.error('Error saving data:', err);
      }
    });
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const gridElement = this.elRef.nativeElement.querySelector('.k-grid'); // Adjust based on your table's class or ID

    // If the click is outside the table, save the data
    if (gridElement && !gridElement.contains(event.target as Node)) {
      // Save any unsaved data before the user clicks outside
      this.gridData.forEach(item => {
        if (item.isEditing) {
          this.saveRow(item);
        }
      });
    }
  }
  onPreferenceSelect(preference: string): void {
    this.selectedPreference = preference;  // Set the selected preference
    console.log(`Selected Preference: ${this.selectedPreference}`);
  }

  // Method to save the selected preference
  savePreferences(): void {
    const newPreference = prompt('Please enter a new preference name:');
    if (newPreference && newPreference.trim() !== '') {
      const preferenceObject = {
        name: newPreference.trim(),
        state: this.gridState
      };

      this.productService.addPreference(preferenceObject).subscribe(() => {
        this.preferences.push(newPreference.trim());
        alert(`Preference "${newPreference}" with grid state has been added!`);
      });
    } else {
      alert('Preference name cannot be empty.');
    }
  }









}
