import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartPopUpComponent } from '../cart-pop-up/cart-pop-up.component';
import { addToCart } from '../cart.actions';
import { CartItem, CartState } from '../cart.reducer';
import { selectCartTotalItems } from '../cart.selectors';
import { DataService } from '../data.service';
import { ProductDetail } from '../product-detail/product-detail.model';

@Component({
  standalone: true,
  selector: 'full-stack-eshop-app-header-product-detail',
  templateUrl: './header-product-detail.component.html',
  styleUrls: ['./header-product-detail.component.scss'],
  imports: [CartPopUpComponent, NgIf, NgFor, CommonModule, RouterLink]
})
export class HeaderProductDetailComponent implements OnInit {
  showCart = false;
  cart$!: Observable<CartItem[]>
  productCount!: number;
  quantity: FormControl = new FormControl(1);
  cartProducts!: ProductDetail
  product!: ProductDetail | undefined;
  cartTotalItems$!: Observable<number>


  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<{ cart: CartState }>,
  ) {
    this.cart$ = store.pipe(select(state => state.cart.items));
    this.cartTotalItems$ = store.pipe(select(selectCartTotalItems))
  }

  ngOnInit() {
    const productName = this.activatedRoute.snapshot.params['name'];
    this.dataService.getDataBySlug(productName).subscribe((product) => {
      this.product = product;
      if (this.product?.features) {
        this.product.features = this.product.features.replace(/\n/g, '<br>');
      }
    });
  }

  goBack() {
    this.router.navigate(['/']); // Replace '/' with the appropriate route for your home page
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  addToCart(product: ProductDetail, quantity: number) {
    this.store.dispatch(addToCart({ product, quantity }));
  }
}
