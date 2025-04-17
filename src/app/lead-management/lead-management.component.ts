import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KENDO_CHARTS } from "@progress/kendo-angular-charts";
import {
  DataBindingDirective,
  ExcelModule,
  GridModule,
  KENDO_GRID,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
} from "@progress/kendo-angular-grid";
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { process } from "@progress/kendo-data-query";
import { SVGIcon, fileExcelIcon, filePdfIcon } from "@progress/kendo-svg-icons";
import { DropDownListComponent, DropDownListModule, KENDO_DROPDOWNLIST, KENDO_DROPDOWNS, } from '@progress/kendo-angular-dropdowns';
import { FormsModule, NgModel } from '@angular/forms';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import * as XLSX from 'xlsx';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import data from '../../assets/data/data.json';

@Component({
  selector: 'app-lead-management',
  standalone: true,
  imports: [CommonModule, KENDO_GRID, KENDO_CHARTS, KENDO_INPUTS, KENDO_GRID_EXCEL_EXPORT, KENDO_GRID_PDF_EXPORT, KENDO_DROPDOWNLIST, FormsModule, KENDO_DROPDOWNS, DropDownListModule, KENDO_BUTTONS, ExcelExportModule, ExcelModule, GridModule],
  templateUrl: './lead-management.component.html',
  styleUrl: './lead-management.component.css'
})
export class LeadManagementComponent implements OnInit {
  public gridData: unknown[] = []; // Grid data is now empty.
  mySelection: any[] = [];
  public gridView!: unknown[];

  selectedLeadValue!: string;
  defaultLead = 'Select a Lead';
  allLeadsOptions = [
    { text: 'Lead 1', value: 'lead1' },
    { text: 'Lead 2', value: 'lead2' },
    { text: 'Lead 3', value: 'lead3' },
  ];

  selectLead(lead: any) {
    this.selectedLeadValue = lead.text;
  }

  selectedPreference: string = '';
  // List of saved preferences
  allPreferences: string[] = ['Preference 1', 'Preference 2', 'Preference 3'];

  // Method to handle selection of preference
  selectPreference(preference: string): void {
    this.selectedPreference = preference;
    console.log('Selected Preference:', this.selectedPreference);
  }

  public ngOnInit(): void {
    console.log('Loaded JSON data:', data); // Debug
    this.gridData = data;
    this.gridView = data; // Set the gridView to the empty data.
  }

  public onFilter(value: Event): void {
    const inputValue = value;

    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "full_name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "job_title",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "budget",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "phone",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "address",
            operator: "contains",
            value: inputValue,
          },
        ],
      },
    }).data;

    // this.dataBinding.skip = 0;
  }

  public onActionClick(dataItem: any): void {
    console.log('Action button clicked for:', dataItem);
    // Add your custom logic here
  }

  public onEdit(dataItem: any): void {
    console.log('Edit action triggered for:', dataItem);
    // Add your edit logic here
  }

  public onDelete(dataItem: any): void {
    console.log('Delete action triggered for:', dataItem);
    // Add your delete logic here
  }

  public onSave(dataItem: any): void {
    console.log('Save button clicked for:', dataItem);
    // Add your custom logic for saving the data item here
  }

  public exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.gridView);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Leads');
    XLSX.writeFile(wb, 'LeadData.xlsx');
  }

  public onCreate(): void {
    console.log('Create button clicked');
    // Add logic to handle the creation of a new lead
  }
}
