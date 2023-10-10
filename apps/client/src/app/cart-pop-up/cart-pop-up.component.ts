import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { clearCart, updateCart } from '../cart.actions';
import { CartItem, CartState } from '../cart.reducer';
import { selectCartItems, selectCartTotalItems } from '../cart.selectors';

@Component({
  standalone: true,
  selector: 'full-stack-eshop-app-cart-pop-up',
  templateUrl: './cart-pop-up.component.html',
  styleUrls: ['./cart-pop-up.component.scss'],
  imports: [CommonModule, RouterLink, FormsModule]
})

export class CartPopUpComponent implements OnInit, OnDestroy {
  count$!: Observable<number>;
  // quantityControl!: FormControl<number>;
  cartTotalItems$!: Observable<number>
  cartItems$!: Observable<CartItem[]>;
  private destroy$ = new Subject<void>();

  constructor(private store: Store<{ cart: CartState }>) {
  }

  ngOnInit(): void {
    this.count$ = this.store.select(state => state.cart.items.length);
    this.cartItems$ = this.store.pipe(select(selectCartItems));
    this.cartTotalItems$ = this.store.pipe(select(selectCartTotalItems))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  incrementQuantity(item: CartItem): void {
    const updatedItem = { ...item };
    updatedItem.quantity++;
    this.updateCartItem(updatedItem);
  }

  decrementQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      const updatedItem = { ...item };
      updatedItem.quantity--;
      this.updateCartItem(updatedItem);
    }
  }

  updateCartItem(item: CartItem): void {
    this.store.dispatch(
      updateCart({ productSlug: item.product.slug, quantity: item.quantity })
    );
  }

  calculateTotal(cartItems: CartItem[] | null): number {
    if (!cartItems || cartItems.length === 0) {
      return 0;
    }

    let total = 0;
    for (const item of cartItems) {
      total += item.product.price * item.quantity;
    }
    return total;
  }

  removeAll(): void {
    this.store.dispatch(clearCart());
  }
}
