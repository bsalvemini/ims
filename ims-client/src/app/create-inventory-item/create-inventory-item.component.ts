import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-inventory-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div>
      <h1>Create an inventory item</h1>
      <form [formGroup]="createInventoryItemForm" (ngSubmit)="createInventoryItem()" class="create-inventory-item">
        <div class="create-inventory-item-group">
          <label for="category">Category</label>
          <select formControlName="category" name="category" id="category">
            @for(category of categories; track category) {
              <option value="{{ category }}">{{ category }}</option>
            }
          </select>
        </div>
        <div class="create-inventory-item-group">
          <label for="supplier">Supplier</label>
          <select formControlName="supplier" name="supplier" id="supplier">
            @for(supplier of suppliers; track supplier) {
              <option value="{{ supplier }}">{{ supplier }}</option>
            }
          </select>
        </div>
        <div class="create-inventory-item-group">
          <label for="name">Name</label>
          <input type="text" name="name" id="name" placeholder="Enter item's name">
        </div>
        <div class="create-inventory-item-group">
          <label for="description">Description</label>
          <input type="text" name="description" id="description" placeholder="Enter item's description">
        </div>
        <div class="create-inventory-item-group">
          <label for="quantity">Quantity</label>
          <input type="number" name="quantity" id="quantity" placeholder="Enter the quantity">
        </div>
        <div class="create-inventory-item-group">
          <label for="price">Price</label>
          <label for="dollarSign">$</label>
          <input type="number" name="price" id="price" placeholder="Enter the price">
        </div>
        <input type="submit" class="createItemButton" value="Create inventory item">
      </form>
    </div>
  `,
  styles: `
  .create-inventory-item {

  }
  `
})
export class CreateInventoryItemComponent {
  categories: string[] = [];
  suppliers: string[] = [];
  errorMessage: string;

  createInventoryItemForm: FormGroup = this.fb.group({
    category: [null, Validators.compose([Validators.required])],
    supplier: [null, Validators.compose([Validators.required])],
    name: [null, Validators.compose([Validators.required])],
    description: [null, Validators.compose([Validators.required])],
    quantity: [null, Validators.compose([Validators.required])],
    price: [null, Validators.compose([Validators.required])]
  })

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.errorMessage = '';
  }

  createInventoryItem() {
    const category = this.createInventoryItemForm.controls['category'].value;
    const supplier = this.createInventoryItemForm.controls['supplier'].value;
    const name = this.createInventoryItemForm.controls['name'].value;
    const description = this.createInventoryItemForm.controls['description'].value;
    const quantity = this.createInventoryItemForm.controls['quantity'].value;
    const price = this.createInventoryItemForm.controls['price'].value;
    // const dataCreated
    // const dateModified

    if (!this.createInventoryItemForm.valid) {
        this.errorMessage = "Please fill in all fields.";
        return;
    }

    // this.http.post(`${}/create-inventory-item`, { name, description, quantity, price })

  }

}
