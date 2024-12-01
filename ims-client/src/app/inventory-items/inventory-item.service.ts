import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AddInventoryItemDTO, InventoryItem } from './inventory-item';

@Injectable({
providedIn: 'root'
})
export class InventoryItemService {
  constructor(private http: HttpClient) { }

  addInventoryItem(inventoryItem: AddInventoryItemDTO) {
    return this.http.post<InventoryItem>(`${environment.apiBaseUrl}/api/create-inventory-item`, inventoryItem);
  }
}
