import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductEntity } from 'src/app/main/feature/products/domain/entities/product.entity';
import { ModalButtonComponent } from 'src/app/shared/presentation/components/buttons/modal-button/modal-button.component';
import { ModalCardComponent } from 'src/app/shared/presentation/components/cards/modal-card/modal-card.component';
import { SidebarDrawerComponent } from 'src/app/shared/presentation/components/sidebar-drawer/sidebar-drawer.component';
import { SpanComponent } from 'src/app/shared/presentation/components/texts/span/span.component';
import { ConcatPipe } from 'src/app/shared/presentation/helpers/pipes/concat.pipe';
import { ProductSharingService } from 'src/app/main/feature/products/presentation/services/product-sharing.service';
import { ProductInfoEditComponent } from 'src/app/main/feature/products/presentation/edit/product-info/product-info.component';
import { ProductInventoryComponent } from 'src/app/main/feature/products/presentation/edit/product-inventory/product-inventory.component';
import { ProductPriceComponent } from 'src/app/main/feature/products/presentation/edit/product-price/product-price.component';

@Component({
  selector: 'edit-product-content',
  templateUrl: './edit-product.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SidebarDrawerComponent,
    SpanComponent,
    ModalButtonComponent,
    ModalCardComponent,
    ConcatPipe,
    ProductInfoEditComponent,
    ProductPriceComponent,
    ProductInventoryComponent,
  ],
})
export class EditProductComponent implements OnInit, OnDestroy {
  @Input() currentPage: string = 'main-edit';

  imgPlaceholder: string = 'assets/illustrations/photo-organization-upload.png';
  currentProduct!: ProductEntity;
  subscription!: Subscription;

  constructor(private sharingService: ProductSharingService) {
  
  }

  ngOnInit(): void {
    this.subscription = this.sharingService.currentProduct.subscribe(
      (product) => (this.currentProduct = product)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changePage(page: string) {
    this.currentPage = page;
  }
}
