import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KENDO_CHARTS } from "@progress/kendo-angular-charts";
import {
  DataBindingDirective,
  ExcelModule,
  KENDO_GRID,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
} from "@progress/kendo-angular-grid";
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { process } from "@progress/kendo-data-query";
import { SVGIcon, fileExcelIcon, filePdfIcon } from "@progress/kendo-svg-icons";
import { employees } from "./employees";
import { images } from "./images"
import { DropDownListComponent, DropDownListModule, KENDO_DROPDOWNLIST, KENDO_DROPDOWNS, } from '@progress/kendo-angular-dropdowns';
import { FormsModule, NgModel } from '@angular/forms';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import * as XLSX from 'xlsx';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';

@Component({
  selector: 'app-lead-management',
  standalone: true,
  imports: [CommonModule, KENDO_GRID, KENDO_CHARTS, KENDO_INPUTS, KENDO_GRID_EXCEL_EXPORT, KENDO_GRID_PDF_EXPORT, KENDO_DROPDOWNLIST, FormsModule, KENDO_DROPDOWNS, DropDownListModule, KENDO_BUTTONS, ExcelExportModule, ExcelModule],
  templateUrl: './lead-management.component.html',
  styleUrl: './lead-management.component.css'
})
export class LeadManagementComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  public gridData: unknown[] = [
    {
      Action: 'Edit',
      record_id: 'R001',
      last_name: 'Smith',
      first_name: 'John',
      email: 'john.smith@example.com',
      phone_type: 'Mobile',
      lmp_id: 'LMP123',
      appointment_type: 'Consultation',
      booking_agency: 'Agency A',
      assigned_date: '2025-04-01',
      sales_rep: 'Jane Doe',
      coordinator: 'Mark Lee',
      sync_to_mobile: true,
      created_sources: "Web",
      mobile_sync_status: "Synced",
      effective_date: "2025-04-15",
      valid_through: "2025-12-31"
    },
    {
      Action: "View",
      record_id: "R002",
      last_name: "Doe",
      first_name: "Jane",
      email: "jane.doe@example.com",
      phone_type: "Home",
      lmp_id: "LMP456",
      appointment_type: "Follow-up",
      booking_agency: "Agency B",
      assigned_date: "2025-04-05",
      sales_rep: "John Smith",
      coordinator: "Anna White",
      sync_to_mobile: false,
      created_sources: "Mobile",
      mobile_sync_status: "Pending",
      effective_date: "2025-04-20",
      valid_through: "2025-11-30"
    },
    {
      Action: "Edit",
      record_id: "R003",
      last_name: "Brown",
      first_name: "Charlie",
      email: "charlie.brown@example.com",
      phone_type: "Work",
      lmp_id: "LMP789",
      appointment_type: "Initial Meeting",
      booking_agency: "Agency C",
      assigned_date: "2025-04-10",
      sales_rep: "Alice Green",
      coordinator: "Bob Grey",
      sync_to_mobile: true,
      created_sources: "Web",
      mobile_sync_status: "Synced",
      effective_date: "2025-04-25",
      valid_through: "2025-10-31"
    },
    {
      Action: "View",
      record_id: "R004",
      last_name: "Taylor",
      first_name: "Chris",
      email: "chris.taylor@example.com",
      phone_type: "Mobile",
      lmp_id: "LMP101",
      appointment_type: "Follow-up",
      booking_agency: "Agency D",
      assigned_date: "2025-04-12",
      sales_rep: "Diana Prince",
      coordinator: "Clark Kent",
      sync_to_mobile: false,
      created_sources: "Mobile",
      mobile_sync_status: "Pending",
      effective_date: "2025-04-30",
      valid_through: "2025-09-30"
    },
    {
      Action: "Edit",
      record_id: "R005",
      last_name: "Johnson",
      first_name: "Alex",
      email: "alex.johnson@example.com",
      phone_type: "Home",
      lmp_id: "LMP202",
      appointment_type: "Consultation",
      booking_agency: "Agency E",
      assigned_date: "2025-04-15",
      sales_rep: "Bruce Wayne",
      coordinator: "Diana Prince",
      sync_to_mobile: true,
      created_sources: "Web",
      mobile_sync_status: "Synced",
      effective_date: "2025-05-01",
      valid_through: "2025-12-15"
    },
    {
      Action: "View",
      record_id: "R006",
      last_name: "Williams",
      first_name: "Taylor",
      email: "taylor.williams@example.com",
      phone_type: "Work",
      lmp_id: "LMP303",
      appointment_type: "Initial Meeting",
      booking_agency: "Agency F",
      assigned_date: "2025-04-18",
      sales_rep: "Clark Kent",
      coordinator: "Lois Lane",
      sync_to_mobile: false,
      created_sources: "Mobile",
      mobile_sync_status: "Pending",
      effective_date: "2025-05-05",
      valid_through: "2025-11-20"
    },
    {
      Action: "Edit",
      record_id: "R007",
      last_name: "Davis",
      first_name: "Jordan",
      email: "jordan.davis@example.com",
      phone_type: "Mobile",
      lmp_id: "LMP404",
      appointment_type: "Follow-up",
      booking_agency: "Agency G",
      assigned_date: "2025-04-20",
      sales_rep: "Lois Lane",
      coordinator: "Bruce Wayne",
      sync_to_mobile: true,
      created_sources: "Web",
      mobile_sync_status: "Synced",
      effective_date: "2025-05-10",
      valid_through: "2025-12-01"
    },
    {
      Action: 'View',
      record_id: 'R008',
      last_name: 'Martinez',
      first_name: 'Jamie',
      email: 'jamie.martinez@example.com',
      phone_type: 'Home',
      lmp_id: 'LMP505',
      appointment_type: 'Consultation',
      booking_agency: 'Agency H',
      assigned_date: '2025-04-22',
      sales_rep: 'Alice Green',
      coordinator: 'Mark Lee',
      sync_to_mobile: false,
      created_sources: 'Mobile',
      mobile_sync_status: 'Pending',
      effective_date: '2025-05-15',
      valid_through: '2025-10-15'
    },
    {
      Action: 'View',
      record_id: 'R008',
      last_name: 'Martinez',
      first_name: 'Jamie',
      email: 'jamie.martinez@example.com',
      phone_type: 'Home',
      lmp_id: 'LMP505',
      appointment_type: 'Consultation',
      booking_agency: 'Agency H',
      assigned_date: '2025-04-22',
      sales_rep: 'Alice Green',
      coordinator: 'Mark Lee',
      sync_to_mobile: false,
      created_sources: 'Mobile',
      mobile_sync_status: 'Pending',
      effective_date: '2025-05-15',
      valid_through: '2025-10-15'
    },
    {
      Action: 'View',
      record_id: 'R008',
      last_name: 'Martinez',
      first_name: 'Jamie',
      email: 'jamie.martinez@example.com',
      phone_type: 'Home',
      lmp_id: 'LMP505',
      appointment_type: 'Consultation',
      booking_agency: 'Agency H',
      assigned_date: '2025-04-22',
      sales_rep: 'Alice Green',
      coordinator: 'Mark Lee',
      sync_to_mobile: false,
      created_sources: 'Mobile',
      mobile_sync_status: 'Pending',
      effective_date: '2025-05-15',
      valid_through: '2025-10-15'
    },
    {
      Action: 'View',
      record_id: 'R008',
      last_name: 'Martinez',
      first_name: 'Jamie',
      email: 'jamie.martinez@example.com',
      phone_type: 'Home',
      lmp_id: 'LMP505',
      appointment_type: 'Consultation',
      booking_agency: 'Agency H',
      assigned_date: '2025-04-22',
      sales_rep: 'Alice Green',
      coordinator: 'Mark Lee',
      sync_to_mobile: false,
      created_sources: 'Mobile',
      mobile_sync_status: 'Pending',
      effective_date: '2025-05-15',
      valid_through: '2025-10-15'
    },
    {
      Action: 'View',
      record_id: 'R008',
      last_name: 'Martinez',
      first_name: 'Jamie',
      email: 'jamie.martinez@example.com',
      phone_type: 'Home',
      lmp_id: 'LMP505',
      appointment_type: 'Consultation',
      booking_agency: 'Agency H',
      assigned_date: '2025-04-22',
      sales_rep: 'Alice Green',
      coordinator: 'Mark Lee',
      sync_to_mobile: false,
      created_sources: 'Mobile',
      mobile_sync_status: 'Pending',
      effective_date: '2025-05-15',
      valid_through: '2025-10-15'
    },
    {
      Action: 'View',
      record_id: 'R008',
      last_name: 'Martinez',
      first_name: 'Jamie',
      email: 'jamie.martinez@example.com',
      phone_type: 'Home',
      lmp_id: 'LMP505',
      appointment_type: 'Consultation',
      booking_agency: 'Agency H',
      assigned_date: '2025-04-22',
      sales_rep: 'Alice Green',
      coordinator: 'Mark Lee',
      sync_to_mobile: false,
      created_sources: 'Mobile',
      mobile_sync_status: 'Pending',
      effective_date: '2025-05-15',
      valid_through: '2025-10-15'
    },
    {
      Action: 'View',
      record_id: 'R008',
      last_name: 'Martinez',
      first_name: 'Jamie',
      email: 'jamie.martinez@example.com',
      phone_type: 'Home',
      lmp_id: 'LMP505',
      appointment_type: 'Consultation',
      booking_agency: 'Agency H',
      assigned_date: '2025-04-22',
      sales_rep: 'Alice Green',
      coordinator: 'Mark Lee',
      sync_to_mobile: false,
      created_sources: 'Mobile',
      mobile_sync_status: 'Pending',
      effective_date: '2025-05-15',
      valid_through: '2025-10-15'
    },
    {
      Action: 'View',
      record_id: 'R008',
      last_name: 'Martinez',
      first_name: 'Jamie',
      email: 'jamie.martinez@example.com',
      phone_type: 'Home',
      lmp_id: 'LMP505',
      appointment_type: 'Consultation',
      booking_agency: 'Agency H',
      assigned_date: '2025-04-22',
      sales_rep: 'Alice Green',
      coordinator: 'Mark Lee',
      sync_to_mobile: false,
      created_sources: 'Mobile',
      mobile_sync_status: 'Pending',
      effective_date: '2025-05-15',
      valid_through: '2025-10-15'
    },
    {
      Action: 'View',
      record_id: 'R008',
      last_name: 'Martinez',
      first_name: 'Jamie',
      email: 'jamie.martinez@example.com',
      phone_type: 'Home',
      lmp_id: 'LMP505',
      appointment_type: 'Consultation',
      booking_agency: 'Agency H',
      assigned_date: '2025-04-22',
      sales_rep: 'Alice Green',
      coordinator: 'Mark Lee',
      sync_to_mobile: false,
      created_sources: 'Mobile',
      mobile_sync_status: 'Pending',
      effective_date: '2025-05-15',
      valid_through: '2025-10-15'
    },
    {
      Action: 'View',
      record_id: 'R008',
      last_name: 'Martinez',
      first_name: 'Jamie',
      email: 'jamie.martinez@example.com',
      phone_type: 'Home',
      lmp_id: 'LMP505',
      appointment_type: 'Consultation',
      booking_agency: 'Agency H',
      assigned_date: '2025-04-22',
      sales_rep: 'Alice Green',
      coordinator: 'Mark Lee',
      sync_to_mobile: false,
      created_sources: 'Mobile',
      mobile_sync_status: 'Pending',
      effective_date: '2025-05-15',
      valid_through: '2025-10-15'
    },
    {
      Action: 'View',
      record_id: 'R008',
      last_name: 'Martinez',
      first_name: 'Jamie',
      email: 'jamie.martinez@example.com',
      phone_type: 'Home',
      lmp_id: 'LMP505',
      appointment_type: 'Consultation',
      booking_agency: 'Agency H',
      assigned_date: '2025-04-22',
      sales_rep: 'Alice Green',
      coordinator: 'Mark Lee',
      sync_to_mobile: false,
      created_sources: 'Mobile',
      mobile_sync_status: 'Pending',
      effective_date: '2025-05-15',
      valid_through: '2025-10-15'
    },
  ];
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
