import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Supplier } from './supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getSuppliers() {
    return this.http.get<Supplier[]>(`${environment.apiBaseUrl}/api/suppliers`);
  }

  getSupplier(supplierId: number) {
    return this.http.get<Supplier>(`${environment.apiBaseUrl}/api/suppliers/${supplierId}`);
  }
}
