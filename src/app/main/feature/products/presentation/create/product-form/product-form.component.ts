import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AtomModule } from '@sitec/sarao';
import { ProductModel } from 'src/app/main/feature/products/infrastructure/models/product.model';
import { AddButtonComponent } from 'src/app/shared/presentation/components/buttons/add-button/add-button.component';
import { ImageUploadModal } from 'src/app/shared/presentation/components/modals/dragndrop-modal/image-upload-modal.component';
import { SharedPresentation } from 'src/app/shared/presentation/shared.module';

@Component({
  selector: 'new-product-page',
  templateUrl: './product-form.component.html',
  standalone: true,
  imports: [CommonModule, SharedPresentation, FormsModule, ReactiveFormsModule, AddButtonComponent, AtomModule, ImageUploadModal]
})
export class ProductFormComponent {
  @Output() submited = new EventEmitter<ProductModel>();

  showDragDrop: boolean = false;

  newProductForm = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required]],
  });


  constructor(private fb: FormBuilder){
    this.newProductForm.controls.price.setValue(0)
  }

  submitForm(){ 
    if (!this.newProductForm.valid) {
      this.newProductForm.markAllAsTouched();
      return;
    }
    let newProduct: ProductModel ={
      name: this.newProductForm.controls.name.value!,
      prices: [
        {
          amount: Number(this.newProductForm.controls.price.value),
          currency: 'Bolivianos'
        }
      ],
      isTrackingInventoryMovement: false
    };

    this.submited.emit(newProduct)
   }

   imageHandler(event: any){
   }

   


}


