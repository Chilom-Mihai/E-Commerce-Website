import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlsoLikeComponent } from '../also-like/also-like.component';
import { AlsoLikeItem } from '../also-like/also-like.model';
import { addToCart } from '../cart.actions';
import { CartItem, CartState } from '../cart.reducer';
import { CategoryComponent } from '../category/category.component';
import { CategoryItem } from '../category/category.model';
import { DataService } from '../data.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderProductDetailComponent } from '../header-product-detail/header-product-detail.component';
import { LocationComponent } from '../location/location.component';
import { ProductDetail } from './product-detail.model';



@Component({
  standalone: true,
  selector: 'full-stack-eshop-app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  imports: [HeaderProductDetailComponent, AlsoLikeComponent, CategoryComponent, LocationComponent, FooterComponent, NgIf, NgFor, ReactiveFormsModule]
})
export class ProductDetailComponent implements OnInit {
  // quantity = 0;
  showCart = false;
  cart$!: Observable<CartItem[]>
  productCount!: number;
  quantity: FormControl = new FormControl(1);
  cartProducts!: ProductDetail
  product!: ProductDetail | undefined;

  categoryItems: CategoryItem[] = [
    {
      title: 'Headphones',
      imgPath: '../../assets/headphones.svg',
      url: '/headphones'
    },
    {
      title: 'Speakers',
      imgPath: '../../../assets/speakers.svg',
      url: '/speakers'
    },
    {
      title: 'Earphones',
      imgPath: '../../../assets/earphones.svg',
      url: '/earphones'
    }
  ]

  alsoLikeItems: AlsoLikeItem[] = [
    {
      name: 'XX99 MARK I',
      imgPath: '../../assets/headphones.svg',
      url: '/headphones'
    },
    {
      name: 'XX59',
      imgPath: '../../../assets/headphones-xx59.svg',
      url: '/headphones'
    },
    {
      name: 'ZX9 SPEAKER',
      imgPath: '../../../assets/speakers.svg',
      url: '/speakers'
    }
  ]

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<{ cart: CartState }>,
  ) {
    this.cart$ = store.pipe(select(state => state.cart.items));
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
    this.router.navigate(['/']);
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  addToCart(product: ProductDetail) {
    const quantity = this.quantity.value;
    this.store.dispatch(addToCart({ product, quantity }));
  }

}
