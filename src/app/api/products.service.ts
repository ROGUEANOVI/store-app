import { HttpClient } from "@angular/common/http";
import { EnvironmentInjector, inject, Injectable, runInInjectionContext, Signal, signal } from "@angular/core";
import { environment } from "@envs/environment.development";
import { Product } from "@shared/models/product.interface";
import { map, tap } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/products`;
  private readonly injector = inject(EnvironmentInjector);


  public products = signal<Product[]>([]);

  constructor() {
    this.getProducts();
  }

  public getProducts(sort?: string): void {
    this.http.get<Product[]>(`${this.apiUrl}?sort=${sort}`)
      .pipe(
        map((products: Product[]) =>
          products.map((product: Product) =>
            ({ ...product, quantity: 1 })
          )
        ),
        tap((products) => this.products.set(products))
      )
      .subscribe();
  }

  public getProductById(id: number): Signal<Product | undefined> {
    return runInInjectionContext(this.injector, () =>
      toSignal<Product>(
        this.http.get<Product>(`${this.apiUrl}/${id}`)
      )
    );
  }
}
