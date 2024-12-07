import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AddInventoryItemDTO, InventoryItem, UpdateInventoryItemDTO } from './inventory-item';

@Injectable({
providedIn: 'root'
})
export class InventoryItemService {
  constructor(private http: HttpClient) { }

  addInventoryItem(inventoryItem: AddInventoryItemDTO) {
    return this.http.post<InventoryItem>(`${environment.apiBaseUrl}/api/create-inventory-item`, inventoryItem);
  }

  updateInventoryItem(inventoryItem: UpdateInventoryItemDTO, inventoryItemId: string) {
    return this.http.patch<InventoryItem>(`${environment.apiBaseUrl}/api/items/${inventoryItemId}`, inventoryItem);
  }

  getInventoryItem(inventoryItemId: string) {
    return this.http.get<InventoryItem>(`${environment.apiBaseUrl}/api/itemById/${inventoryItemId}`);
  }

  getInventoryItems() {
    return this.http.get<InventoryItem[]>(`${environment.apiBaseUrl}/api/items`);
  }
}
