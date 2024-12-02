import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateInventoryItemComponent } from './inventory-items/create-inventory-item/create-inventory-item.component';
import { ListAllInventoryItemsComponent } from './list-all-inventory-items/list-all-inventory-items.component';

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
  }
];
