import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  GridModule,
  ExcelModule,
  KENDO_GRID,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
} from '@progress/kendo-angular-grid';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { DropDownListModule, KENDO_DROPDOWNLIST, KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms';
import { KENDO_BUTTONS, KENDO_DROPDOWNBUTTON } from '@progress/kendo-angular-buttons';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { ProductserviceService } from './productservice.service';

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
    KENDO_DROPDOWNBUTTON
  ]
})
export class LeadManagementComponent implements OnInit {
  public gridData: any[] = [];
  public gridView: any[] = [];
  public mySelection: number[] = [];

  public isCreating = false;
  public newRecord: any = {};
  public editedRecords: Set<number> = new Set();

  constructor(
    private productService: ProductserviceService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getAllProducts();

  }

  getAllProducts(): void {
    this.productService.getAllproducts().subscribe({
      next: (data: any[]) => {
        this.gridData = data.map(item => ({
          ...item,
          isNew: false,
          isEditing: false
        }));
        this.gridView = [...this.gridData];
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
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


  onSaveNew(dataItem: any): void {
    this.productService.createProduct(dataItem).subscribe({
      next: () => {
        this.isCreating = false;
        this.getAllProducts();
      },
      error: (err) => {
        console.error('Error creating product:', err);
      }
    });
  }

  onCancelNew(): void {
    this.gridData = this.gridData.filter(item => !item.isNew);
    this.gridView = [...this.gridData];
    this.isCreating = false;

  }

  onEdit(dataItem: any): void {
    dataItem.isEditing = true;
  }

  onSave(dataItem: any): void {
    this.productService.updateProduct(dataItem.id, dataItem).subscribe({
      next: () => {
        dataItem.isEditing = false;
        this.getAllProducts();
      },
      error: (err) => {
        console.error('Error updating product:', err);
      }
    });
  }

  onCancelEdit(dataItem: any): void {
    dataItem.isEditing = false;
    this.getAllProducts(); // Optionally revert changes
  }

  onDelete(dataItem: any): void {

    this.productService.deleteProduct(dataItem.id).subscribe({
      next: () => this.getAllProducts(),
      error: (err) => console.error('Error deleting product:', err)
    });

  }
  public areaData: any[] = [
    { text: ' View Lead', value: 'viewLead' },
    { text: ' Edit Lead', value: 'editLead' },
    { text: ' Assign to Sales Rep', value: 'assignSalesRep' },
    { text: ' Schedule Appointment', value: 'scheduleAppointment' },
    { text: ' Possible Matches', value: 'possibleMatches' },
    { text: ' Tie and Untie Qualified Leads', value: 'tieUntieLeads' },
    { text: ' Audit Trail', value: 'auditTrail' },
    { text: ' Estimates', value: 'estimates' },
    { text: ' Lead Documents', value: 'leadDocuments' },
    { text: ' Register With STS', value: 'registerSTS' },
    { text: ' Survey List', value: 'surveyList' },
    { text: ' Duplicate Lead', value: 'duplicateLead' },
    { text: ' Chat', value: 'chat' },
  ];



  // ];
  // onActionSelect(action: string, dataItem: any): void {
  //   // Perform the corresponding action based on the selected item
  //   switch (action) {
  //     case 'viewLead':
  //       console.log('View Lead', dataItem);
  //       break;
  //     case 'editLead':
  //       console.log('Edit Lead', dataItem);
  //       break;
  //     // Handle other cases here
  //   }
  // }
}
