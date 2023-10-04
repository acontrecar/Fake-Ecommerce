import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductsFilterComponent } from './pages/products-filter/products-filter.component';

const routes: Routes = [
  {
    path: 'product/:id',
    component: ProductPageComponent,
  },
  {
    path: 'product-filter',
    component: ProductsFilterComponent,
  },
  {
    path: 'category/:categoryName',
    component: CategoryProductsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
