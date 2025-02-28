import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductEntity } from 'src/app/main/feature/products/domain/entities/product.entity';
import { AddButtonComponent } from 'src/app/shared/presentation/components/buttons/add-button/add-button.component';
import { SharedPresentation } from 'src/app/shared/presentation/shared.module';
import { ProductSharingService } from '../../services/product-sharing.service';

@Component({
  selector: 'jichi-product-price',
  templateUrl: './product-price.component.html',
  standalone: true,
  imports: [CommonModule, SharedPresentation, FormsModule, ReactiveFormsModule, AddButtonComponent]
})
export class ProductPriceComponent implements OnInit, OnDestroy{
  productPriceForm = this.fb.group({
    price: [0, Validators.required],
    cost : [0, [Validators.required]],
  });
  currentProduct! : ProductEntity
  subscription!: Subscription

  constructor(private fb: FormBuilder, private productSharing: ProductSharingService){
  }

  ngOnInit(): void {
    this.subscription = this.productSharing.currentProduct.subscribe(product => this.currentProduct = product)
    this.productPriceForm.patchValue({
      price: this.currentProduct?.prices[0].amount,
      cost: this.currentProduct?.inventory.cost
    })
  }
  ngOnDestroy(): void {
   this.subscription.unsubscribe()
  }

  submitForm(){
    if (!this.productPriceForm.valid) {
      this.productPriceForm.markAllAsTouched();
      return;
    }
    this.currentProduct.prices[0].amount = this.productPriceForm.controls.price.value!;
    this.currentProduct.inventory.cost = this.productPriceForm.controls.cost.value!;
    this.productSharing.changeProduct(this.currentProduct)
  }
}
