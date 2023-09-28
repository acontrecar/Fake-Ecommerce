import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CategoryProducts } from '../../interfaces/category-products.interfaces';

@Component({
  // selector: 'products-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  private productsService = inject(ProductsService);

  public categories = signal<string[]>([]);

  public categoryProducts = signal<CategoryProducts[]>([]);

  ngOnInit(): void {
    this.categoryProducts.set(
      this.productsService.getAllProductsAndCategories()
    );
  }
}
