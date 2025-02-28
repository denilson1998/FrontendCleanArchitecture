import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductEntity } from 'src/app/main/feature/products/domain/entities/product.entity';
import { AddButtonComponent } from 'src/app/shared/presentation/components/buttons/add-button/add-button.component';
import { SharedPresentation } from 'src/app/shared/presentation/shared.module';
import { ProductSharingService } from '../../services/product-sharing.service';

@Component({
  selector: 'jichi-edit-product-details',
  templateUrl: './product-info.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SharedPresentation,
    FormsModule,
    ReactiveFormsModule,
    AddButtonComponent,
  ],
})
export class ProductInfoEditComponent implements OnInit, OnDestroy {
  editProductForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', [Validators.required]],
    skuCode: ['', [Validators.required]],
  });
  currentProduct!: ProductEntity;
  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private productSharing: ProductSharingService
  ) {}
  ngOnInit(): void {
    this.subscription = this.productSharing.currentProduct.subscribe(
      (product) => (this.currentProduct = product)
    );
    this.editProductForm.patchValue({
      name: this.currentProduct?.name,
      description: this.currentProduct?.description,
      skuCode: this.currentProduct?.skuCode,
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submitForm() {
    if (!this.editProductForm.valid) {
      this.editProductForm.markAllAsTouched();
      return;
    }
    this.currentProduct.description =
    this.editProductForm.controls.description.value!;
    this.currentProduct.name = this.editProductForm.controls.description.value!;
    this.currentProduct.skuCode = this.editProductForm.controls.skuCode.value!;
    this.productSharing.changeProduct(this.currentProduct);
  }
}
