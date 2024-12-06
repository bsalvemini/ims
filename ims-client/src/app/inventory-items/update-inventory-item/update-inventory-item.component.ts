import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Category } from '../../categories/category';
import { Supplier } from '../../suppliers/supplier';
import { InventoryItem, UpdateInventoryItemDTO } from '../inventory-item';
import { InventoryItemService } from '../inventory-item.service';
import { CategoryService } from '../../categories/category.service';
import { SupplierService } from '../../suppliers/supplier.service';

@Component({
  selector: 'app-update-inventory-item',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  template: `
    <div class="form-container">
      <h1>Update an inventory item</h1>
      <form [formGroup]="updateInventoryItemForm" (ngSubmit)="updateInventoryItem()" class="update-inventory-item">
        <div class="form-group">
          <label for="category">Category:</label>
          <select formControlName="category" name="category" class="select">
          <option [ngValue]="null" [disabled]="true">Select the category</option>
            @for(category of categories; track category) {
              <option value="{{ category.categoryName }}">{{ category.categoryName }}</option>
            }
          </select>
        </div>
        <div class="form-group">
          <label for="supplier">Supplier:</label>
          <select formControlName="supplier" name="supplier" class="select">
          <option [ngValue]="null" [disabled]="true">Select the supplier</option>
            @for(supplier of suppliers; track supplier) {
              <option value="{{ supplier.supplierName }}">{{ supplier.supplierName }}</option>
            }
          </select>
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" name="name" id="name" placeholder="Enter the name" formControlName="name">
        </div>
        @if (updateInventoryItemForm.controls['name'].touched &&
        updateInventoryItemForm.controls['name'].hasError('required')) {
          <div class="alert">Name is required.</div>
        } @else if (updateInventoryItemForm.controls['name'].value.length < 3 &&
          updateInventoryItemForm.controls['name'].value.length != 0) {
          <div class="alert">Name must be 3 characters</div>
        } @else if (updateInventoryItemForm.controls['name'].value.length > 100) {
          <div class="alert">Name cannot exceed 100 characters</div>
        }
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea rows="8" name="description" id="description" placeholder="Enter the description" formControlName="description"></textarea>
        </div>
        @if (updateInventoryItemForm.controls['description'].touched &&
        updateInventoryItemForm.controls['description'].hasError('required')) {
          <div class="alert">Description is required.</div>
        } @else if (updateInventoryItemForm.controls['description'].value.length < 3 &&
          updateInventoryItemForm.controls['description'].value.length != 0) {
          <div class="alert">Name must be 3 characters</div>
        } @else if (updateInventoryItemForm.controls['description'].value.length > 500) {
          <div class="alert">Description cannot exceed 500 characters</div>
        }
        <div class="form-group">
          <label for="quantity">Quantity:</label>
          <input type="number" name="quantity" id="quantity" min="0" placeholder="Enter the quantity" formControlName="quantity">
        </div>
        @if (updateInventoryItemForm.controls['quantity'].touched &&
        updateInventoryItemForm.controls['quantity'].hasError('required')) {
          <div class="alert">Quantity is required.</div>
        }
        <div class="form-group">
          <label for="price">Price:</label>
          <input type="number" name="price" id="price" min="0.0" placeholder="Enter the price" formControlName="price">
        </div>
        @if (updateInventoryItemForm.controls['price'].touched &&
        updateInventoryItemForm.controls['price'].hasError('required')) {
          <div class="alert">Price is required.</div>
        }
        <div class="form-actions">
          <input type="submit" value="Update item">
          <input type="button" value="Cancel" routerLink="/inventory-items" class="cancelButton">
        </div>
      </form>
    </div>
  `,
  styles: ``
})
export class UpdateInventoryItemComponent {
  inventoryItem: InventoryItem;
  categories: Category[] = [];
  suppliers: Supplier[] = [];
  errorMessage: string;
  inventoryItemId: string;
  categoryId!: number; // Variable to store categoryId
  supplierId!: number; // Variable to store categoryId
  categoryName!: string;
  supplierName!: string;

  updateInventoryItemForm: FormGroup = this.fb.group({
    category: [null, Validators.compose([Validators.required])],
    supplier: [null, Validators.compose([Validators.required])],
    name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
    description: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(500)])],
    quantity: [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
    price: [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]+.?[0-9]*$")])]
  })

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router,
    private inventoryItemService: InventoryItemService, private categoryService: CategoryService,
    private supplierService: SupplierService) {
    this.inventoryItemId = this.route.snapshot.paramMap.get('inventoryItemId') || "";
    this.inventoryItem = {} as InventoryItem;
    this.errorMessage = '';

    // Query to get the categories
    this.categoryService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
    // Query to get the suppliers
    this.supplierService.getSuppliers().subscribe({
      next: (data: any) => {
        this.suppliers = data;
      },
      error: (err) => {
        console.error('Error fetching suppliers:', err);
      }
    });

    this.inventoryItemService.getInventoryItem(this.inventoryItemId).subscribe({
      next: (inventoryItem: InventoryItem) => {
        if (!inventoryItem) {
          this.router.navigate(['/inventory-items']);
        }

        this.inventoryItem = inventoryItem;
      },
      error: (error) => {
        console.error('Error fetching inventory item details', error);
      },
      complete: () => {
        this.categoryService.getCategory(this.inventoryItem.categoryId).subscribe({
          next: (data: Category) => {
            // Set the values obtained
            this.categoryName = data['categoryName'];
            this.updateInventoryItemForm.controls['category'].setValue(this.categoryName);
          },
          error: (error: any) => {
            console.error('Error fetching agent performance by supervisor data:', error);
          }
        });

        supplierService.getSupplier(this.inventoryItem.supplierId).subscribe({
          next: (data: Supplier) => {
            // Set the values obtained
            this.supplierName = data['supplierName'];
            this.updateInventoryItemForm.controls['supplier'].setValue(this.supplierName);
          },
          error: (error: any) => {
            console.error('Error fetching agent performance by supervisor data:', error);
          }
        });

        this.updateInventoryItemForm.controls['name'].setValue(this.inventoryItem.name);
        this.updateInventoryItemForm.controls['description'].setValue(this.inventoryItem.description);
        this.updateInventoryItemForm.controls['quantity'].setValue(this.inventoryItem.quantity);
        this.updateInventoryItemForm.controls['price'].setValue(this.inventoryItem.price);
      }
    });
  }

  updateInventoryItem() {
    const categoryName = this.updateInventoryItemForm.controls['category'].value;
    const supplierName = this.updateInventoryItemForm.controls['supplier'].value;
    const name = this.updateInventoryItemForm.controls['name'].value;
    const description = this.updateInventoryItemForm.controls['description'].value;
    const quantity = this.updateInventoryItemForm.controls['quantity'].value;
    const price = this.updateInventoryItemForm.controls['price'].value;

    console.log('category name', categoryName);
    console.log('supplier name', supplierName);

    // Check if the categories array is not empty.
    if (this.categories.length) {
      // Get categoryId from the categories array
      for(let category of this.categories) {
        if(category.categoryName === categoryName) {
          this.categoryId = category.categoryId;
        }
      }
    }

    // Check if the suppliers array is not empty.
    if (this.suppliers.length) {
      // Get supplierId from the suppliers array
      for(let supplier of this.suppliers) {
        if(supplier.supplierName === supplierName) {
          this.supplierId = supplier.supplierId;
        }
      }
    }

    // Check if the createInventoryItemForm is invalid.
    if (!this.updateInventoryItemForm.valid) {
      this.errorMessage = "Please fill in all fields.";
      alert(this.errorMessage);
      return;
    } else {
      const updateInventoryItem: UpdateInventoryItemDTO = {
        categoryId: this.categoryId,
        supplierId: this.supplierId,
        name: name,
        description: description,
        quantity: quantity,
        price: price
      };

      console.log('Updating Inventory Item', updateInventoryItem);

      this.inventoryItemService.updateInventoryItem(updateInventoryItem, this.inventoryItemId).subscribe({
        next: (result: any) => {
          console.log(`Inventory Item update successfully: ${result.message}`);
          this.router.navigate(['/inventory-items']);
        },
        error: (error) => {
          console.error('Error updating inventory item', error);
        }
      });
    }
  }

}
