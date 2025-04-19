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
export class ProductService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/products';



  getAll(): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  update(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}

