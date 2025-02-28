import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ProductEntity } from 'src/app/main/feature/products/domain/entities/product.entity';
@Injectable({
  providedIn: 'root',
})
export class ProductSharingService {
  private productSource = new ReplaySubject<ProductEntity>();
  currentProduct = this.productSource.asObservable();
  constructor() {}

  changeProduct(product: ProductEntity) {
    this.productSource.next(product);
  }
}
