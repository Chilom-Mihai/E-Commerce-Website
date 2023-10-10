import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState, CartItem } from './cart.reducer';

// Select the cart state
export const selectCartState = createFeatureSelector<CartState>('cart');

// Select the cart items
export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

// Select the total number of items in the cart
export const selectCartTotalItems = createSelector(
  selectCartItems,
  (items: CartItem[]) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }
);

// Select the total price of all items in the cart
export const selectCartTotalPrice = createSelector(
  selectCartItems,
  (items: CartItem[]) => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
);
