import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CategoryProductsComponent,
    HomePageComponent,
    ListProductsComponent,
    ProductPageComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, FormsModule],
})
export class ProductsModule {}
