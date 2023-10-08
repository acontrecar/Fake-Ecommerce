import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  CartItem,
  ShoppingCart,
} from 'src/app/shared/interfaces/carts.interfaces';
import { GlobalService } from 'src/app/shared/services/global.service';
import Swal from 'sweetalert2';

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
  }

  public increase(productId: number, quantity: number): void {
    this.globalService.increaseQuantity(productId, quantity);
    this.shoppingCart = this.globalService.loadFromLocalStorage();
  }

  public decrease(
    productId: number,
    quantity: number,
    productQuantity: number
  ): void {
    if (productQuantity <= 1) return;
    this.globalService.decreaseQuantity(productId, quantity);
    this.shoppingCart = this.globalService.loadFromLocalStorage();
  }

  public delete(productId: number): void {
    this.globalService.deleteProduct(productId);
    this.shoppingCart = this.globalService.loadFromLocalStorage();
  }

  public finished(): void {
    Swal.fire({
      title: 'Estas seguro de finizalizar?',
      text: 'No podrás volver atrás!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Finizalizado!', 'Gracias por visitar mi pagina.', 'success');
        this.globalService.finish();
        this.shoppingCart = this.globalService.loadFromLocalStorage();
      }
    });
  }
}
