import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ProductModel } from 'src/app/main/feature/products/infrastructure/models/product.model';
import { ModalButtonComponent } from 'src/app/shared/presentation/components/buttons/modal-button/modal-button.component';
import { SidebarDrawerComponent } from 'src/app/shared/presentation/components/sidebar-drawer/sidebar-drawer.component';
import { SpanComponent } from 'src/app/shared/presentation/components/texts/span/span.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { ProductFormComponent } from './product-form/product-form.component';

@Component({
  selector: 'new-product-content',
  templateUrl: './create-product.component.html',
  standalone: true,
  imports: [
    CommonModule, 
    SidebarDrawerComponent, 
    SpanComponent, 
    ModalButtonComponent, 
    ProductFormComponent,
    InventoryFormComponent
  ]
})
export class CreateProductComponent{

  
  @Input() createProductIsOpen: boolean = false;
  @Input() currentPage: string = 'create-options';
  @Output() closeCreateProductDrawerEvent = new EventEmitter<boolean>();
  title: string = 'Seleccioná una opción';
  subtitle: string = 'Seleccioná un método para registrar tus productos.';
  button1Text: string = 'Agregar manualmente';
  button2Text: string = 'Subir un archivo de Excel';
  newProduct!: ProductModel;

  closeMenu(){}

  openAdd(){
    this.currentPage = 'new-product-form';
    this.title = 'Nuevo producto';
    this.subtitle = '';
  }
  
  openImport(){}

  gotoInventory(event: ProductModel){
     this.newProduct = event
     this.currentPage = 'inventory-form'
  }

  
  saveProduct(event: ProductModel){
    this.newProduct.isTrackingInventoryMovement = event.isTrackingInventoryMovement
    this.newProduct.inventory = event.inventory

 }
}
