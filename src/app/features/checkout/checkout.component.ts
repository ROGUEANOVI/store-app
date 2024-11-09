import { Component, inject } from '@angular/core';
import { CheckoutService } from './services/checkout.service';
import { CartStore } from '@shared/store/shopping-cart.store';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  private readonly checkoutService = inject(CheckoutService);

  public readonly cartStore = inject(CartStore);

  onProceedToPay(): void {
    this.checkoutService.onProceedToPay(this.cartStore.products());
  }

  removeItem(id: number): void {
    this.cartStore.removeFromCart(id);
  }

  clearAll(): void {
    this.cartStore.clearCart();
  }
}
