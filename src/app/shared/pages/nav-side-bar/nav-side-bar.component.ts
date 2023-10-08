import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'nav-side-bar',
  templateUrl: './nav-side-bar.component.html',
  styleUrls: ['./nav-side-bar.component.scss'],
})
export class NavSideBarComponent implements OnInit {
  public isSidebarOpen = signal<boolean>(false);

  private productsService = inject(ProductsService);
  private router = inject(Router);

  public categories = signal<string[]>([]);

  public isCartOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.productsService.getAllCategories().subscribe((categories) => {
      this.categories.set(categories);
    });
  }

  public nagivateHouse(): void {
    this.router.navigateByUrl('/');
  }

  public toggleSidebar(): void {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }

  public closeSidebar(): void {
    // cart;
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }

  public toggleCartAside(): void {
    this.isCartOpen.set(!this.isCartOpen());
  }
}
