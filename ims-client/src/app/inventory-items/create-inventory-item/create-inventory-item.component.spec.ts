import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateInventoryItemComponent } from './create-inventory-item.component';
import { InventoryItemService } from '../inventory-item.service';
import { AddInventoryItemDTO, InventoryItem } from '../../suppliers/inventory-item';

describe('CreateInventoryItemComponent', () => {
  let component: CreateInventoryItemComponent;
  let fixture: ComponentFixture<CreateInventoryItemComponent>;
  let inventoryItemService: InventoryItemService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule,
        CreateInventoryItemComponent
      ],
      providers: [
        InventoryItemService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInventoryItemComponent);
    component = fixture.componentInstance;
    inventoryItemService = TestBed.inject(InventoryItemService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Unit test 1: should have a valid form when all fields are filled correctly.
  it('should have a valid form when all fields are filled correctly', () => {
    component.createInventoryItemForm.controls['category'].setValue('Electronics');
    component.createInventoryItemForm.controls['supplier'].setValue('TechSupplier');
    component.createInventoryItemForm.controls['name'].setValue('Lenovo Laptop');
    component.createInventoryItemForm.controls['description'].setValue(
      'Lenovo - Yoga Pro 9i 16 inches 3.2K Touchscreen Laptop - Intel Core Ultra 9 185H ' +
      'with 32GB Memory - NVIDIA GeForce RTX 4050 - 1TB SSD - Luna Grey'
    );
    component.createInventoryItemForm.controls['quantity'].setValue(10);
    component.createInventoryItemForm.controls['price'].setValue(1299.99);
    component.createInventoryItemForm.controls['dateCreated'].setValue('2024-09-04T21:39:36.605Z');

    expect(component.createInventoryItemForm.valid).toBeTrue();
  });

  // Unit test 2: should call createInventoryItem and navigate on successful form submission.
  it('should call createInventoryItem and navigate on successful form submission', () => {
    const addInventoryItemDTO: AddInventoryItemDTO = {
      categoryId: 1000,
      supplierId: 1,
      name: 'MacBook Air 13.6 Laptop',
      description: 'M2 chip Built for Apple Intelligence - 8GB Memory - 256GB SSD - Midnight',
      quantity: 13,
      price: 749.99,
      dateCreated: "2021-01-01T00:00:00.000Z"
    };
    const mockInventoryItem: InventoryItem = {
      _id: '650c1f1e1c9d440000d1e1f1',
      categoryId: 1000,
      supplierId: 1,
      name: 'MacBook Air 13.6 Laptop',
      description: 'M2 chip Built for Apple Intelligence - 8GB Memory - 256GB SSD - Midnight',
      quantity: 13,
      price: 749.99,
      dateCreated: "2021-01-01T00:00:00.000Z",
      dateModified: "2021-01-01T00:00:00.000Z"
    };

    spyOn(inventoryItemService, 'addInventoryItem').and.returnValue(of(mockInventoryItem));
    spyOn(router, 'navigate');

    component.categoryId = addInventoryItemDTO.categoryId;
    component.supplierId = addInventoryItemDTO.supplierId;

    component.createInventoryItemForm.controls['category'].setValue(addInventoryItemDTO.categoryId);
    component.createInventoryItemForm.controls['supplier'].setValue(addInventoryItemDTO.supplierId);
    component.createInventoryItemForm.controls['name'].setValue(addInventoryItemDTO.name);
    component.createInventoryItemForm.controls['description'].setValue(addInventoryItemDTO.description);
    component.createInventoryItemForm.controls['quantity'].setValue(addInventoryItemDTO.quantity);
    component.createInventoryItemForm.controls['price'].setValue(addInventoryItemDTO.price);
    component.createInventoryItemForm.controls['dateCreated'].setValue(addInventoryItemDTO.dateCreated);

    component.createInventoryItem();

    expect(inventoryItemService.addInventoryItem).toHaveBeenCalledWith(addInventoryItemDTO);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  // Unit test 3: should handle error on form submission failure.
  it('should handle error on form submission failure', () => {
    spyOn(inventoryItemService, 'addInventoryItem').and.returnValue(throwError('Error creating inventory item'));

    spyOn(console, 'error');

    component.createInventoryItemForm.controls['category'].setValue('Electronics');
    component.createInventoryItemForm.controls['supplier'].setValue('TechSupplier');
    component.createInventoryItemForm.controls['name'].setValue('Lenovo Laptop');
    component.createInventoryItemForm.controls['description'].setValue(
      'Lenovo - Yoga Pro 9i 16 inches 3.2K Touchscreen Laptop - Intel Core Ultra 9 185H ' +
      'with 32GB Memory - NVIDIA GeForce RTX 4050 - 1TB SSD - Luna Grey'
    );
    component.createInventoryItemForm.controls['quantity'].setValue(10);
    component.createInventoryItemForm.controls['price'].setValue("1299.99");
    component.createInventoryItemForm.controls['dateCreated'].setValue('2024-09-04T21:39:36.605Z');

    component.createInventoryItem();

    expect(inventoryItemService.addInventoryItem).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error creating inventory item', 'Error creating inventory item');
  });
});
