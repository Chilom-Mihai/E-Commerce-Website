import { createAction, props } from '@ngrx/store';
import { ProductDetail } from './product-detail/product-detail.model';

export const addToCart = createAction(
    '[Cart] Add Item',
    props<{ product: ProductDetail, quantity: number  }>()
);

export const removeFromCart = createAction(
    '[Cart] Remove Item',
    props<{ productName: string }>()
);

export const clearCart = createAction('[Cart] Clear');

export const updateCart = createAction(
    '[Cart] Update Cart',
    props<{ productSlug: string; quantity: number }>()
  );