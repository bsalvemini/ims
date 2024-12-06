import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateInventoryItemComponent } from './inventory-items/create-inventory-item/create-inventory-item.component';
import { ListAllInventoryItemsComponent } from './inventory-items/list-all-inventory-items/list-all-inventory-items.component';
import { UpdateInventoryItemComponent } from './inventory-items/update-inventory-item/update-inventory-item.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create-inventory-item',
    component: CreateInventoryItemComponent
  },
  {
    path: 'inventory-items',
    component: ListAllInventoryItemsComponent
  },
  {
    path: 'inventory-items/:inventoryItemId',
    component: UpdateInventoryItemComponent
  }
];
