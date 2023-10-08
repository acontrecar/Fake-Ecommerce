import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/productsByCategory.interface';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss'],
})
export class ProductsFilterComponent implements OnInit {
  public globalService = inject(GlobalService);
  public productsService = inject(ProductsService);
  public products: Product[] = [];

  ngOnInit(): void {
    this.globalService
      .getSearchedTerm()
      .pipe(debounceTime(600))
      .subscribe((term) => {
        if (!term) this.products = [];
        this.productsService.getProductsBySearchTerm(term).subscribe((res) => {
          this.products = res;
        });
      });
  }
}
