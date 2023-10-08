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

  private shoppingCartSubject = new BehaviorSubject<ShoppingCart>({
    items: [],
    totalCost: 0,
    totalItems: 0,
  });

  public shoppingCart$ = this.shoppingCartSubject.asObservable();

  searchTerm(term: string) {
    this.router.navigate(['/product-filter']);

    this.searchTermSubject.next(term);
  }

  getSearchedTerm(): Observable<string> {
    return this.searchTermSubject.asObservable();
  }

  public addProductToCart(product: Product, quantity: number) {
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
      this.shoppingCartSubject.next(this.shoppingCart);
      localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));

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
    this.shoppingCartSubject.next(this.shoppingCart);

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
    this.shoppingCartSubject.next(this.shoppingCart);
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
    this.shoppingCartSubject.next(this.shoppingCart);
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
    this.shoppingCartSubject.next(this.shoppingCart);
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
  }

  public loadFromLocalStorage(): ShoppingCart {
    if (localStorage.getItem('shoppingCart') == null) return this.shoppingCart;
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')!);

    return this.shoppingCart;
  }

  public loadFromLocalStorageObservable(): Observable<ShoppingCart> {
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')!);
    this.shoppingCartSubject.next(this.shoppingCart);
    return this.shoppingCartSubject.asObservable();
  }
  public finish(): void {
    this.shoppingCart.items = [];
    this.shoppingCart.totalCost = 0;
    this.shoppingCart.totalItems = 0;
    this.shoppingCartSubject.next(this.shoppingCart);
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
  }
}
