import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryProducts } from '../interfaces/category-products.interfaces';
import {
  Product,
  ProductsByCategory,
} from '../interfaces/productsByCategory.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl: string = 'https://dummyjson.com';

  private http = inject(HttpClient);

  public categoryProduct: CategoryProducts[] = [];
  public products: Product[] = [];

  public getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/products/categories`);
  }

  public getProductsByCategory(
    category: string
  ): Observable<ProductsByCategory> {
    return this.http.get<ProductsByCategory>(
      `${this.baseUrl}/products/category/${category}`
    );
  }

  public getAllProductsAndCategories(): CategoryProducts[] {
    let categories: string[] = [];

    this.getAllCategories().subscribe((categoriesResponse: string[]) => {
      categories = categoriesResponse;

      // console.log(categories);

      categories.forEach((category) => {
        this.getProductsByCategory(category).subscribe(
          (products: ProductsByCategory) => {
            this.categoryProduct.push({
              category: category,
              products: products.products,
            });
          }
        );
      });
    });

    return this.categoryProduct;
  }

  public getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  public getProducts(): Observable<ProductsByCategory> {
    return this.http.get<ProductsByCategory>(`${this.baseUrl}/products`);
  }

  public getProductsBySearchTerm(searchTerm: string): Product[] {
    this.getProducts().subscribe((productsArray: ProductsByCategory) => {
      this.products = productsArray.products.filter((products) => {
        return products.title.toLowerCase().includes(searchTerm.toLowerCase());
      });

      console.log(searchTerm, this.products);
    });

    return this.products;
  }
}
