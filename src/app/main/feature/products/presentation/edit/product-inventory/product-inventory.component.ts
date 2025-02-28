import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductEntity } from 'src/app/main/feature/products/domain/entities/product.entity';
import { AddButtonComponent } from 'src/app/shared/presentation/components/buttons/add-button/add-button.component';
import { SharedPresentation } from 'src/app/shared/presentation/shared.module';
import { ProductSharingService } from '../../services/product-sharing.service';

@Component({
  selector: 'jichi-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedPresentation, FormsModule, ReactiveFormsModule, AddButtonComponent]
})
export class ProductInventoryComponent implements OnInit, OnDestroy{
  productInventoryForm = this.fb.group({
    quantity: [0, Validators.required],
    minimumQuantity : [0, [Validators.required]],
  });

  currentProduct! : ProductEntity
  subscription!: Subscription

  constructor(private fb: FormBuilder, private productSharing: ProductSharingService){
  }


  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

  ngOnInit(){
    this.subscription = this.productSharing.currentProduct.subscribe(product => this.currentProduct = product)
  }

  submitForm(){
    this.productSharing.changeProduct(this.currentProduct)
  }
}
