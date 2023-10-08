import { Component, OnInit, inject } from '@angular/core';
import { ShoppingCart } from '../../interfaces/carts.interfaces';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'shopping-cart-aside',
  templateUrl: './shopping-cart-aside.component.html',
  styleUrls: ['./shopping-cart-aside.component.scss'],
})
export class ShoppingCartAsideComponent implements OnInit {
  public shoppingCart: ShoppingCart = {
    items: [],
    totalCost: 0,
    totalItems: 0,
  };

  public router = inject(Router);
  public globalService = inject(GlobalService);

  ngOnInit(): void {
    // this.shoppingCart = this.globalService.loadFromLocalStorage();
    this.globalService.shoppingCart$.subscribe((shoppingCart: ShoppingCart) => {
      console.log(shoppingCart);
      this.shoppingCart = shoppingCart;
    });
    // this.globalService
    //   .loadFromLocalStorageObservable()
    //   .subscribe((shoppingCart: ShoppingCart) => {
    //     this.shoppingCart = shoppingCart;
    //   });
  }

  public toggleCart(): void {
    this.router.navigateByUrl('/cart');
  }
}
