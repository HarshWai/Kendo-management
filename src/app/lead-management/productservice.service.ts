import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id: string;
  action: string;
  last_name: string;
  first_name: string;
  email: string;
  phone_type: string;
  lmp_id: string;
  appointment_type: string;
  booking_agency: string;
  assigned_date: string;
  sales_rep: string;
  coordinator: string;
  sync_to_mobile: boolean;
  created_sources: string;
  mobile_sync_status: string;
  effective_date: string;
  valid_through: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  private apiUrl = 'http://localhost:3000/products';
  private preferencesUrl = 'http://localhost:3000/preferences';

  constructor(private http: HttpClient) { }




  getAllproducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getproductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`); // Replace with your actual backend URL & port
  }

  saveData(item: any): Observable<any> {
    return this.http.put('http://localhost:3000/products/${id}' + item.id, item);
  }
  getPreferences(): Observable<any[]> {
    return this.http.get<any[]>(this.preferencesUrl);
  }

  // Add a new preference to the server
  addPreference(newPreference: string): Observable<any> {
    const preference = { name: newPreference };  // Format the preference data
    return this.http.post<any>(this.preferencesUrl, preference);  // POST request to add preference
  }


}
