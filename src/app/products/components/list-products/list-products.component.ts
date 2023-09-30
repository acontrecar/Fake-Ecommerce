import { Component, Input } from '@angular/core';
import {
  Product,
  ProductsByCategory,
} from '../../interfaces/productsByCategory.interface';

@Component({
  selector: 'products-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent {
  @Input()
  public productsList?: Product[];

  public paco() {
    console.log('paco');
  }
}
