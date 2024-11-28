import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="app-container">
      <header class="header-content">
        <div class="header-title">IMS</div>
        <input type="text" placeholder="Search inventory item.." class="search-inventory-item">
      </header>
      <nav class="side-menu">
        <a class="menu-link" routerLink="/">Home</a>
        <div class="menu-link" (click)="this.invItemLinksVisible = !this.invItemLinksVisible;">Inventory items
            <img src="assets/down-arrow.png" alt="up arrow" class="arrow" *ngIf="!this.invItemLinksVisible">
            <img src="assets/up-arrow.png" alt="up arrow" class="arrow" *ngIf="this.invItemLinksVisible">
        </div>
        <div class="menu-sub-link" *ngIf="this.invItemLinksVisible">
          <a href="">Create Inventory Item</a>
          <a href="">List Item By ID</a>
          <a href="">Update Inventory Item</a>
          <a href="">Delete Inventory Item</a>
          <a href="">List All Inventory Items</a>
        </div>
        <div class="menu-link" (click)="this.suppLinksVisible = !this.suppLinksVisible;">Suppliers
        <img src="assets/down-arrow.png" alt="up arrow" class="arrow" *ngIf="!this.suppLinksVisible">
          <img src="assets/up-arrow.png" alt="up arrow" class="arrow" *ngIf="this.suppLinksVisible">
        </div>
        <div class="menu-sub-link" *ngIf="this.suppLinksVisible">
          <a href="">Create Supplier</a>
          <a href="">List All Suppliers</a>
        </div>
      </nav>
      <main class="main-container">
        <router-outlet />
      </main>
      <footer class="footer-container">
        <p>&copy; 2024 Inventory Management System</p>
      </footer>
    </div>
  `,
  styles: `
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      text-align: center;
      padding: 0;
      margin: 0 auto;
    }

    .footer-container {
      background-color: #000;
      color: #FFF;
      padding: 10px 0;
    }

    .main-container {
      flex: 1;
      padding-top: 50px;
      margin-left: 300px;
    }

    .header-content {
      position: fixed;
      width: 100%;
      text-align: left;
      display: flex;
      padding: 10px;
      font-size: 1.25em;
      border-bottom: 1px solid rgba(33, 35, 38, 0.1);
    }

    .header-title {
      color: #B2742D;
      margin-top: 5px;
      font-family: "Sixtyfour Convergence", serif;
      font-optical-sizing: auto;
      font-weight: 400;
      font-style: normal;
      font-variation-settings:
        "BLED" 0,
        "SCAN" 0,
        "XELA" 0,
        "YELA" 0;
    }

    .search-inventory-item {
      background: url(/assets/search-symbol.png) no-repeat scroll;
      background-size: 14px;
      background-position-y: center;
      background-position-x: 3px;
      padding: 6px 22px;
      margin-left: 250px;
      border: 1px solid rgba(33, 35, 38, 0.1);
      border-radius: 5px;
    }

    .side-menu {
      width: 300px;
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      margin-top: 50px;
      background-color: #FFF;
      overflow-x: hidden;
    }

    .menu-link {
      display: block;
      background: #FDFDFD;
      border: none;
      padding: 12px;
      cursor: pointer;
      outline: none;
      width: 100%;
      color: black;
      text-decoration: none;
      border-bottom: 1px solid rgba(33, 35, 38, 0.1);
      box-shadow: 0px 10px 10px -10px gba(33, 35, 38, 0.1);
      font-size: 16px;
      text-align: left;
      font-family: "Open Sans", sans-serif;
      font-optical-sizing: auto;
      font-weight: 600;
      font-style: normal;
    }

    .menu-sub-link a {
      padding: 10px 10px 10px 40px;
      text-decoration: none;
      text-align: left;
      cursor: pointer;
      outline: none;
      color: black;
      display: block;
      font-family: "Open Sans", sans-serif;
      font-optical-sizing: auto;
      font-weight: 400;
      font-style: normal;
      background: #F5F5F5;
      width: 100%;
    }

    .menu-sub-link a:hover {
      color: #757575;
    }

    .arrow {
      float: right;
      margin-right: 20px;
    }

  `
})
export class AppComponent {
  title = 'ets-client';
  invItemLinksVisible: boolean = false;
  suppLinksVisible: boolean = false;

}
