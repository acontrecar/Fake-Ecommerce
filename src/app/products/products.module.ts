import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { FormsModule } from '@angular/forms';
import { ProductsFilterComponent } from './pages/products-filter/products-filter.component';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
  declarations: [
    CategoryProductsComponent,
    HomePageComponent,
    ListProductsComponent,
    ProductPageComponent,
    ProductsFilterComponent,
    CartComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, FormsModule],
})
export class ProductsModule {}
