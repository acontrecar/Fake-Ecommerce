import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/products/interfaces/productsByCategory.interface';
import { CartItem, ShoppingCart } from '../interfaces/carts.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public isSidebarOpen = false;
  public searchTermSubject = new BehaviorSubject<string>('');
  public router = inject(Router);
  public shoppingCart: ShoppingCart = {
    items: [],
    totalItems: 0,
    totalCost: 0,
  };

  searchTerm(term: string) {
    this.router.navigate(['/product-filter']);

    this.searchTermSubject.next(term);
  }

  getSearchedTerm(): Observable<string> {
    return this.searchTermSubject.asObservable();
  }

  public addProductToCart(product: Product, quantity: number) {
    console.log('Product:', product);
    console.log('Quantity:', quantity);

    const price: number = parseFloat(
      (
        product.price -
        (product.price * product.discountPercentage) / 100
      ).toFixed(2)
    );

    const total: number = parseFloat((price * quantity).toFixed(2));

    if (this.shoppingCart.items.find((item) => item.productId === product.id)) {
      const cartItem = this.shoppingCart.items.find(
        (item) => item.productId === product.id
      );
      cartItem!.quantity += quantity;
      cartItem!.total += total;
      this.shoppingCart.totalCost += total;
      this.shoppingCart.totalItems += quantity;
      localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
      console.log('Cart:', cartItem);
      return;
    }

    const cartItem: CartItem = {
      productId: product.id,
      title: product.title,
      price,
      quantity,
      total: total,
      thumbnail: product.thumbnail,
      description: product.description,
    };

    this.shoppingCart.items.push(cartItem);
    this.shoppingCart.totalCost += total;
    this.shoppingCart.totalItems += quantity;

    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
  }

  public increaseQuantity(productId: number, quantity: number): void {
    const cartItem = this.shoppingCart.items.find(
      (item) => item.productId === productId
    );

    cartItem!.quantity += quantity;
    cartItem!.total += cartItem!.price * quantity;
    this.shoppingCart.totalCost += cartItem!.price * quantity;
    this.shoppingCart.totalItems += quantity;
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
  }

  public decreaseQuantity(productId: number, quantity: number): void {
    const cartItem = this.shoppingCart.items.find(
      (item) => item.productId === productId
    );

    cartItem!.quantity -= quantity;
    cartItem!.total -= cartItem!.price * quantity;
    this.shoppingCart.totalCost -= cartItem!.price * quantity;
    this.shoppingCart.totalItems -= quantity;
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
  }

  public deleteProduct(productId: number): void {
    const cartItem = this.shoppingCart.items.find(
      (item) => item.productId === productId
    );

    this.shoppingCart.totalCost -= cartItem!.total;
    this.shoppingCart.totalItems -= cartItem!.quantity;
    this.shoppingCart.items = this.shoppingCart.items.filter(
      (item) => item.productId !== productId
    );
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
  }

  public loadFromLocalStorage(): ShoppingCart {
    if (localStorage.getItem('shoppingCart') == null) return this.shoppingCart;
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')!);

    return this.shoppingCart;
  }
}
