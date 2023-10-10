import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { loadStripe } from '@stripe/stripe-js';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartItem, CartState } from '../cart.reducer';
import { FooterComponent } from '../footer/footer.component';
import { HeaderProductDetailComponent } from '../header-product-detail/header-product-detail.component';
import { SuccessPageComponent } from "../success-page/success-page.component";
import { TAX } from '../utils';
import { AuthService } from '@auth0/auth0-angular';
import { selectCartTotalItems } from '../cart.selectors';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'full-stack-eshop-app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss',],
  imports: [CommonModule, HeaderProductDetailComponent, FooterComponent, RouterLink, SuccessPageComponent, FormsModule]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  showCheckout = false;
  count$!: Observable<number>;
  private unsubscribe$ = new Subject<void>();
  vatAmount = 0;
  totalAmount = 0;
  cartItems$!: Observable<CartItem[]>;
  stripe!: any
  shippingTax = TAX.Shipping
  cartTotalItems$!: Observable<number>
  userLocale!: string;

  constructor(private store: Store<{ cart: CartState }>, private http: HttpClient, @Inject(DOCUMENT) public document: Document, public auth: AuthService,
  ) {
    this.cartTotalItems$ = store.pipe(select(selectCartTotalItems))
  }

  ngOnInit() {
    this.count$ = this.store.pipe(select(state => state.cart.items.length));
    this.cartItems$ = this.store.pipe(select(state => state.cart.items));
    this.stripe = loadStripe(environment.STRIPE_PUBLIC_KEY);
    this.cartItems$.pipe(takeUntil(this.unsubscribe$)).subscribe(cartItems => {
      this.totalAmount = this.calculateTotal(cartItems);
      this.vatAmount = this.calculateVAT(this.totalAmount, 20); // Assuming a VAT rate of 20%
      this.totalAmount = this.calculateTotalSum(this.totalAmount);
    });

    this.auth.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => this.userLocale = this.getCountryDisplayName(user?.locale))
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  onCkeckout(): void {
    const cartItems: CartItem[] = [];
    this.cartItems$.pipe(takeUntil(this.unsubscribe$)).subscribe((items) => cartItems.push(...items));


    this.http.post(`http://localhost:3333/api/checkout-session`, {
      items: cartItems,
    }).pipe(takeUntil(this.unsubscribe$)).subscribe(async (response: any) => {
      const stripe = await loadStripe(environment.STRIPE_PUBLIC_KEY);
      console.log(response)

      stripe?.redirectToCheckout({
        sessionId: response.id
      })
    });
  }

  getCountryDisplayName(regionCode = ""): string {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(regionCode.toUpperCase()) || " ";
  }
}  
