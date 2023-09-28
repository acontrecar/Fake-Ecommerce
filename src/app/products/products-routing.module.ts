import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomePageComponent,
  //   children: [
  //     {
  //       path: ':category',
  //       component: CategoryComponent,
  //     },
  //   ],
  // },
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
