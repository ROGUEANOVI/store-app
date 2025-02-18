import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./features/products/product.routes').then(r => r.routes)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component').then(c => c.CheckoutComponent)
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products', pathMatch: 'full' },
];
