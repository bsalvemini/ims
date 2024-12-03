import { Component } from '@angular/core';
import { InventoryItem } from '../inventory-item';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-list-all-inventory-items',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="all-items-page">
      <h1 class="all-items-page__title">All Items</h1>

      @if (inventoryItems && inventoryItems.length > 0) {
        <table class="all-items-page__table">
          <thead class="all-items-page__table-head">
            <tr class="all-items-page__table-head">
              <th class="all-items-page__table-header">ID</th>
              <th class="all-items-page__table-header">Category</th>
              <th class="all-items-page__table-header">Supplier</th>
              <th class="all-items-page__table-header">Name</th>
              <th class="all-items-page__table-header">Description</th>
              <th class="all-items-page__table-header">Quantity</th>
              <th class="all-items-page__table-header">Price</th>
            </tr>
          </thead>
          <tbody class="all-items-page__table-body">
            @for (inventoryItem of inventoryItems; track inventoryItem) {
              <tr class="all-items-page__table-row">
                <td class="all-items-page__table-cell">{{ inventoryItem._id }}</td>
                <td class="all-items-page__table-cell">{{ inventoryItem.categoryDetails.categoryName }}</td>
                <td class="all-items-page__table-cell">{{ inventoryItem.supplerDetails.supplierName }}</td>
                <td class="all-items-page__table-cell">{{ inventoryItem.name }}</td>
                <td class="all-items-page__table-cell">{{ inventoryItem.description }}</td>
                <td class="all-items-page__table-cell">{{ inventoryItem.quantity }}</td>
                <td class="all-items-page__table-cell">{{ inventoryItem.price | currency: 'USD' }}</td>
              </tr>
            }
          </tbody>
        </table>
      } @else {
        <p class="all-items-page__no-items">No items found</p>
      }
    </div>
  `,
  styles: `
    .all-items-page {
      max-width: 80%;
      margin: 0 auto;
      padding: 20px;
    }

    .all-items-page__title {
      text-align: left;
    }

    .all-items-page__table {
      width: 100%;
      border-collapse: collapse;
    }

    .all-items-page__table-header {
      background-color: #ffe484;
      color: #000;
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }

    .all-items-page__table-cell {
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }

    .all-items-page__table-cell--functions {
      text-align: center;
    }

    .all-items-page__no-items {
      text-align: center;
      color: #6c757d;
    }
  `
})
export class ListAllInventoryItemsComponent {
  inventoryItems: InventoryItem[] = [];

  constructor(private http: HttpClient) {
    this.http.get(`${environment.apiBaseUrl}/api/items`).subscribe({
      next: (data: any) => {
        this.inventoryItems = data;
      }
    })
  }
}
