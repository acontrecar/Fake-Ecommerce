import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../interfaces/productsByCategory.interface';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  public product?: Product;
  public quantity: number = 1;
  public maxQuantity: number = 1;
  public productService = inject(ProductsService);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.productService.getProductById(id).subscribe((product: Product) => {
        this.product = product;
        this.maxQuantity = product.stock;
      });
    });
  }

  public increase(quantity: number): void {
    if (this.quantity + quantity <= this.maxQuantity) this.quantity += quantity;

    console.log(this.quantity);
  }

  public decrease(quantity: number): void {
    if (this.quantity - quantity >= 1) this.quantity -= quantity;

    console.log(quantity);
  }
}
