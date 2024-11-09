import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CurrencyPipe, SlicePipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  public product = input.required<Product>();
  public productToAddToCart = output<Product>();

  onAddToCart(): void {
    this.productToAddToCart.emit(this.product());
  }
}
