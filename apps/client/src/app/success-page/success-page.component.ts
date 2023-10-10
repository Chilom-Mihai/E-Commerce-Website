import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { loadStripe } from '@stripe/stripe-js';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartItem, CartState } from '../cart.reducer';
import { TAX } from '../utils';
import { clearCart } from '../cart.actions';
import { AppComponent } from "../app.component";
import { HomeComponent } from "../home/home.component";
import JSConfetti from 'js-confetti'

@Component({
  standalone: true,
  selector: 'full-stack-eshop-app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss'],
  imports: [RouterLink, CommonModule, AppComponent, HomeComponent]
})
export class SuccessPageComponent implements OnInit, OnDestroy {
  showCheckout = false;
  showAll = false;
  count$!: Observable<number>;
  private destroy$ = new Subject<void>();
  vatAmount = 0;
  totalAmount = 0;
  cartItems$!: Observable<CartItem[]>;
  stripe!: any
  shippingTax = TAX.Shipping

  constructor(private store: Store<{ cart: CartState }>) { }


  ngOnInit() {
    this.count$ = this.store.pipe(select(state => state.cart.items.length));
    this.cartItems$ = this.store.pipe(select(state => state.cart.items));
    this.stripe = loadStripe(environment.STRIPE_PUBLIC_KEY);

    this.cartItems$.subscribe(cartItems => {
      this.totalAmount = this.calculateTotal(cartItems);
      this.vatAmount = this.calculateVAT(this.totalAmount, 20); // Assuming a VAT rate of 20%
      this.totalAmount = this.calculateTotalSum(this.totalAmount);
    });
    this.orderSuccess();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  calculateVAT(amount: number, rate: number): number {
    return amount * rate / 100;
  }

  calculateTotal(cartItems: CartItem[] | null): number {
    if (!cartItems) {
      return 0;
    }

    let total = 0;
    for (const cartItem of cartItems) {
      total += cartItem.product.price * cartItem.quantity;
    }
    return total;
  }

  calculateTotalSum(amount: number): number {
    const VAT_RATE = 20; // Assuming a VAT rate of 20%
    const additionalAmount = 50;
    const vatAmount = this.calculateVAT(amount, VAT_RATE);
    const totalAmount = amount + vatAmount + additionalAmount;
    return totalAmount;
  }


  togglePay() {
    this.showCheckout = !this.showCheckout;
  }

  showAllItems() {
    this.showAll = !this.showAll;
  }

  resetCart() {
    this.store.dispatch(clearCart());
  }

  orderSuccess() {
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti()
  }
}
