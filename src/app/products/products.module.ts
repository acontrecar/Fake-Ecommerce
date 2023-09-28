import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { ProductListCategoryComponent } from './components/product-list-category/product-list-category.component';

@NgModule({
  declarations: [CategoryProductsComponent, ProductListCategoryComponent],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
