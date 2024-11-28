import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <h2>Welcome to the Inventory Management System</h2>
    <p>Choose an option from the list on the left to get started.</p>
  `,
  styles: ``
})
export class HomeComponent {
}
