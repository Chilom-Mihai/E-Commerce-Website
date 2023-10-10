import { createReducer, on } from '@ngrx/store';
import { ProductDetail } from './product-detail/product-detail.model';
import { addToCart, removeFromCart, clearCart, updateCart } from './cart.actions';


export interface CartItem {
  product: ProductDetail;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product, quantity }) => {
    const existingItem = state.items.find((item) => item.product.slug === product.slug);
    if (existingItem) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.slug === product.slug ? { ...item, quantity: item.quantity + quantity } : item
        ),
      };
    } else {
      return {
        ...state,
        items: [...state.items, { product, quantity }],
      };
    }
  }),
  on(removeFromCart, (state, { productName }) => ({
    ...state,
    items: state.items.filter(item => item.product.slug !== productName)
  })),
  on(clearCart, state => ({
    ...state,
    items: []
  })),
  on(updateCart, (state, { productSlug, quantity }) => ({
    ...state,
    items: state.items.map(item =>
      item.product.slug === productSlug ? { ...item, quantity } : item
    )
  }))
);
