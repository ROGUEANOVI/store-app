import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '@shared/models/product.interface';
import { ToastrService } from 'ngx-toastr';

export interface CartStore {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

const initialState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products }) => ({
    productsCount: computed( () => calculateProductCount(products()) ),
    totalAmount: computed( () => calculateTotalAmount(products()) ),
  })),
  withMethods(({ products, ...store }, toastrService = inject(ToastrService)) => ({
    addToCart(product: Product) {
      const isProductInCart = products().find(
        (item: Product) => item.id === product.id
      );

      if (isProductInCart) {
        isProductInCart.quantity++;
        isProductInCart.subtotal = isProductInCart.quantity * isProductInCart.price;
        patchState(store, { products: [...products()] });
      } else {
        patchState(store, { products: [...products(), product] });
      }
      toastrService.success('Product added', 'STORE APP');
    },
    removeFromCart(id: number) {
      const updatedProducts = products().filter((product) => product.id !== id);
      patchState(store, { products: updatedProducts });
      toastrService.info('Product removed', 'STORE APP');
    },
    clearCart() {
      patchState(store, initialState);
      toastrService.info('Cart cleared', 'STORE APP');
    },
  }))
);

function calculateTotalAmount(products: Product[]): number {
  return products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
}

function calculateProductCount(products: Product[]): number {
  return products.reduce((acc, product) => acc + product.quantity, 0);
}
