import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartState } from '../cart.reducer';
import { selectCartTotalItems } from '../cart.selectors';
import { NgIf, CommonModule } from '@angular/common';
import { CartPopUpComponent } from '../cart-pop-up/cart-pop-up.component';

@Component({
  standalone: true,
  selector: 'full-stack-eshop-app-header-hse',
  templateUrl: './header-hse.component.html',
  styleUrls: ['./header-hse.component.scss'],
  imports: [RouterLink, NgIf, CommonModule, CartPopUpComponent]
})
export class HeaderHseComponent {
  @Input() category = '';

  showCart = false;
  cartTotalItems$!: Observable<number>

  constructor(

    private store: Store<{ cart: CartState }>,
  ) {
    this.cartTotalItems$ = store.pipe(select(selectCartTotalItems))
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
}
