import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { KENDO_CHARTS } from "@progress/kendo-angular-charts";
import {
  DataBindingDirective,
  KENDO_GRID,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
} from "@progress/kendo-angular-grid";
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { process } from "@progress/kendo-data-query";
import { SVGIcon, fileExcelIcon, filePdfIcon } from "@progress/kendo-svg-icons";
import { employees } from "./employees";
import { images } from "./images"
import { DropDownListComponent, DropDownListModule, KENDO_DROPDOWNLIST, KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-lead-management',
  standalone: true,
  imports: [CommonModule, KENDO_GRID, KENDO_CHARTS, KENDO_INPUTS, KENDO_GRID_EXCEL_EXPORT, KENDO_GRID_PDF_EXPORT, KENDO_DROPDOWNLIST, FormsModule, KENDO_DROPDOWNS, DropDownListComponent, DropDownListModule],
  templateUrl: './lead-management.component.html',
  styleUrl: './lead-management.component.css'
})
export class LeadManagementComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  public gridData: unknown[] = employees;
  public gridView!: unknown[];

  public mySelection: string[] = [];
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;

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

  // public allLeadsOptions = [
  //   { text: 'All Leads', value: 'all' },
  //   { text: 'New Leads', value: 'new' },
  //   { text: 'Contacted', value: 'contacted' },
  //   { text: 'Qualified', value: 'qualified' }
  // ];


  // public defaultLead = { text: 'Select Lead Type', value: null };
  // public selectedLeadValue: string | null = null;

  public ngOnInit(): void {
    this.gridView = this.gridData;
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

    this.dataBinding.skip = 0;
  }

  public photoURL(dataItem: { img_id: string; gender: string }): string {
    const code: string = dataItem.img_id + dataItem.gender;
    const image: { [Key: string]: string } = images;

    return image[code];
  }

  public flagURL(dataItem: { country: string }): string {
    const code: string = dataItem.country;
    const image: { [Key: string]: string } = images;

    return image[code];
  }
}
