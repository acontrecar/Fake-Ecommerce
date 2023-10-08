import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/products/interfaces/productsByCategory.interface';
import { ProductsService } from 'src/app/products/services/products.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'shared-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  public productsService = inject(ProductsService);
  public products: Product[] = [];
  public router = inject(Router);
  public globalService = inject(GlobalService);

  public onKeyPress(searchTerm: string) {
    this.globalService.searchTerm(searchTerm);
  }
}
