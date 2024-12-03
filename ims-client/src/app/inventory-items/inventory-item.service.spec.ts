import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from
'@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { InventoryItemService } from './inventory-item.service';
import { AddInventoryItemDTO, InventoryItem } from '../suppliers/inventory-item';

describe('InventoryItemService', () => {
  let service: InventoryItemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InventoryItemService]
    });

    service = TestBed.inject(InventoryItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create a new inventory item', () => {
    const newInventoryItemDTO: AddInventoryItemDTO = {
      categoryId: 1000,
      supplierId: 1,
      name: 'MacBook Air 13.6 Laptop',
      description: 'M2 chip Built for Apple Intelligence - 8GB Memory - 256GB SSD - Midnight',
      quantity: 13,
      price: 749.99,
      dateCreated: "2021-01-01T00:00:00.000Z"
    };
    const newInventoryItem: InventoryItem = {
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

    service.addInventoryItem(newInventoryItemDTO).subscribe(inventoryItem => {
      expect(inventoryItem).toEqual(newInventoryItem);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/create-inventory-item`);
    expect(req.request.method).toBe('POST');
    req.flush(newInventoryItem);
  });
});
