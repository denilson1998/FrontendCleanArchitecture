import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/main/feature/products/infrastructure/models/product.model';
import { AddButtonComponent } from 'src/app/shared/presentation/components/buttons/add-button/add-button.component';
import { SpanComponent } from 'src/app/shared/presentation/components/texts/span/span.component';
import { SharedPresentation } from 'src/app/shared/presentation/shared.module';

@Component({
  selector: 'inventory-form',
  templateUrl: './inventory-form.component.html',
  standalone: true,
  imports: [CommonModule, SharedPresentation, FormsModule, ReactiveFormsModule, AddButtonComponent, SpanComponent]
})
export class InventoryFormComponent {

  @Output() submited = new EventEmitter<ProductModel>();
  inventoryForm = this.fb.group({
    quantity: [0, [Validators.required] ],
    minimumQuantity: [0, [Validators.required]],
    isTrackingInventoryMovement: [false, [Validators.required] ]
  });


  constructor(private fb: NonNullableFormBuilder){

    this.inventoryForm.controls.quantity.setValue(0)
  }

  saveInventory(){
   let productInventory: ProductModel = 
   {
     name: '',
     prices: [],
     inventory: {
      quantity: Number(this.inventoryForm.controls.quantity.value),
      minimumQuantity: Number(this.inventoryForm.controls.minimumQuantity.value),
      cost: 0
     },
     isTrackingInventoryMovement: this.inventoryForm.value.isTrackingInventoryMovement
   }

   this.submited.emit(productInventory)
  }

}
