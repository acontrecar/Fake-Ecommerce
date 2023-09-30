import { Component, inject, OnInit } from '@angular/core';
import {
  Product,
  ProductsByCategory,
} from '../../interfaces/productsByCategory.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { switchMap } from 'rxjs';
import { CategoryProducts } from '../../interfaces/category-products.interfaces';

@Component({
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss'],
})
export class CategoryProductsComponent implements OnInit {
  public productsList?: Product[];
  public categoryName: string = '';
  public products: Product[] = [];

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
        this.productsList = products.products;
        this.getCategoryName();
      });
  }

  public getCategoryName(): void {
    this.activatedRoute.params.subscribe(({ categoryName }) => {
      this.categoryName = categoryName;
      console.log(categoryName);
    });
  }
}
