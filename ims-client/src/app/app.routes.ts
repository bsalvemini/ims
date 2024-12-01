import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateInventoryItemComponent } from './inventory-items/create-inventory-item/create-inventory-item.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create-inventory-item',
    component: CreateInventoryItemComponent
  }
];
