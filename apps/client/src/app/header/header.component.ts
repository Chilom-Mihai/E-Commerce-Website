import { CommonModule, DOCUMENT, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartPopUpComponent } from "../cart-pop-up/cart-pop-up.component";
import { CartState } from '../cart.reducer';
import { selectCartTotalItems } from '../cart.selectors';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  standalone: true,
  selector: 'full-stack-eshop-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, NgIf, CommonModule, CartPopUpComponent]
})
export class HeaderComponent implements OnInit {
  showCart = false;
  cartTotalItems$!: Observable<number>

  constructor(
    @Inject(DOCUMENT) public document: Document, public auth: AuthService,
    private store: Store<{ cart: CartState }>,
  ) {
    this.cartTotalItems$ = store.pipe(select(selectCartTotalItems))
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }


  ngOnInit(): void {
    this.auth.user$.subscribe(console.log)
  }

  loginWithRedirect() {
    this.auth.loginWithPopup();
  }
}
