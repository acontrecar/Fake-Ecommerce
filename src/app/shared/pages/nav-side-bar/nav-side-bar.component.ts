import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'nav-side-bar',
  templateUrl: './nav-side-bar.component.html',
  styleUrls: ['./nav-side-bar.component.scss'],
})
export class NavSideBarComponent implements OnInit {
  public isSidebarOpen = signal<boolean>(false);

  private productsService = inject(ProductsService);

  public categories = signal<string[]>([]);

  ngOnInit(): void {
    this.productsService.getAllCategories().subscribe((categories) => {
      this.categories.set(categories);
    });
  }

  public toggleSidebar(): void {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }

  public closeSidebar(): void {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }
}
