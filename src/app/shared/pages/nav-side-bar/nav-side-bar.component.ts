import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/products/services/products.service';
import { GlobalService } from '../../services/global.service';
import { ShoppingCart } from '../../interfaces/carts.interfaces';

@Component({
  selector: 'nav-side-bar',
  templateUrl: './nav-side-bar.component.html',
  styleUrls: ['./nav-side-bar.component.scss'],
})
export class NavSideBarComponent implements OnInit {
  public isSidebarOpen = signal<boolean>(false);

  private productsService = inject(ProductsService);
  private router = inject(Router);
  private globalService = inject(GlobalService);

  public categories = signal<string[]>([]);
  public isCartOpen = signal<boolean>(false);

  public numberOfProducts: number = 0;

  ngOnInit(): void {
    this.productsService.getAllCategories().subscribe((categories) => {
      this.categories.set(categories);
    });

    this.globalService.shoppingCart$.subscribe((products: ShoppingCart) => {
      this.numberOfProducts = products.totalItems;
    });
  }

  public nagivateHouse(): void {
    this.router.navigateByUrl('/');
  }

  public toggleSidebar(): void {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }

  public closeSidebar(): void {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }

  public toggleCartAside(): void {
    this.isCartOpen.set(!this.isCartOpen());
  }
}
