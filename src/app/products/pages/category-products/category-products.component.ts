import { Component, inject, OnInit } from '@angular/core';
import {
  Product,
  ProductsByCategory,
} from '../../interfaces/productsByCategory.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { switchMap } from 'rxjs';

@Component({
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss'],
})
export class CategoryProductsComponent implements OnInit {
  public productsList?: ProductsByCategory;
  public categoryName: string = '';

  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ categoryName }) =>
          this.productsService.getProductsByCategory(categoryName)
        )
      )
      .subscribe((products: ProductsByCategory) => {
        this.productsList = products;
        console.log(this.productsList);
      });

    this.activatedRoute.params.subscribe(({ categoryName }) => {
      this.categoryName = categoryName;
    });
  }
}
