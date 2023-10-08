import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  CartItem,
  ShoppingCart,
} from 'src/app/shared/interfaces/carts.interfaces';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public shoppingCart: ShoppingCart = {
    items: [],
    totalCost: 0,
    totalItems: 0,
  };

  public globalService = inject(GlobalService);

  ngOnInit(): void {
    this.shoppingCart = this.globalService.loadFromLocalStorage();
    console.log(this.shoppingCart);
  }

  public increase(productId: number, quantity: number): void {
    this.globalService.increaseQuantity(productId, quantity);
    this.shoppingCart = this.globalService.loadFromLocalStorage();
  }

  public decrease(productId: number, quantity: number): void {
    this.globalService.decreaseQuantity(productId, quantity);
    this.shoppingCart = this.globalService.loadFromLocalStorage();
  }

  public delete(productId: number): void {
    this.globalService.deleteProduct(productId);
    this.shoppingCart = this.globalService.loadFromLocalStorage();
  }
}
