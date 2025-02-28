import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartItem, CreateSalesOrderState } from '../../states/create-order.state';
import { NgOptimizedImage } from '@angular/common'
import { AtomModule } from '@sitec/sarao';
import { FormsModule } from '@angular/forms';
import { CustomersListForSelectionComponent } from '../customers-list-for-selection/customers-list-for-selection.component';
import { Router } from '@angular/router';
import { OrderDataModule } from '../../../infrastructure/modules/order.data.module';
import { roundToTwoDecimals } from 'src/app/shared/domain/utils/numbers.utils';

@Component({
  selector: 'cart-drawer',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    AtomModule,
    CustomersListForSelectionComponent,
    FormsModule,
    OrderDataModule
  ],
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.scss']
})
export class CartDrawerComponent {
  @Input() createSalesOrderState!: CreateSalesOrderState;
  currentDrawer: 'cart' | 'customer' | 'paymentMethods' = 'cart';

  constructor(private router: Router){}

  getCartItemQuantity(productId: number) {
    return this.createSalesOrderState
      .cart
      .items
      .find((item) => item.product.id === productId)?.quantity ?? 0
  }

  inputQuantityChange(event: any, productId: number) {
    let quantity: number = Number(event.value) ?? 0;
    quantity = Math.trunc(quantity);
    if (quantity === 0) {
      this.removeCartItemQuantity(productId);
      return;
    }
    let cartItemFound = this.createSalesOrderState
      .cart
      .items
      .find((item) => item.product.id === productId);
    
    if (!cartItemFound) {
      return;
    }
    cartItemFound.quantity = quantity;
    
    this.createSalesOrderState.upsertCartItem(cartItemFound)
  }

  addCartItemQuantity(productId: number) {
    let cartItemFound = this.createSalesOrderState
      .cart
      .items
      .find((item) => item.product.id === productId);
    
    if (!cartItemFound) {
      return;
    }

    cartItemFound.quantity = cartItemFound?.quantity + 1 ?? 1;
    
    this.createSalesOrderState.upsertCartItem(cartItemFound)
  }

  removeCartItemQuantity(productId: number) {
    let cartItemFound = this.createSalesOrderState
      .cart
      .items
      .find((item) => item.product.id === productId);
    if (!cartItemFound) {
      return;
    }

    cartItemFound.quantity = cartItemFound?.quantity - 1 ?? 0;
    if (cartItemFound.quantity <= 0) {
      this.createSalesOrderState.removeCartItem(cartItemFound)
    } else {
      this.createSalesOrderState.upsertCartItem(cartItemFound)
    }
  }

  forceOnlyTwoDecimals(event: any) {
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault()
    }
    const value = event.target.value
    let decimalsNumbers = 0;
    const decimalPointIndex = value.indexOf('.');
    if (decimalPointIndex !== -1 && decimalPointIndex !== (value.length -1)) {
      decimalsNumbers = value.substring(decimalPointIndex+1, value.length).length;
    }
    if (decimalsNumbers >= 2 && Number.isNaN(Number(event.key)) === false) {
      event.preventDefault();
    }
  }

  roundUnitPriceDecimals(cartItem: CartItem) {
    cartItem.unitPrice = Number(cartItem.unitPrice.toFixed(2))
  }

  getType(a: any) {
    return typeof a
  }
  goToConnectBank() {
    this.router.navigateByUrl('/app/payments/link-account');
  }

  openCustomersList() {
    this.currentDrawer = 'customer';
  }

  handleCustomersChange(customers: Array<any>) {
    if (customers.length > 0) {
      this.createSalesOrderState.setCustomer(customers[0]);
      this.currentDrawer = 'cart';
    }
  }
}
