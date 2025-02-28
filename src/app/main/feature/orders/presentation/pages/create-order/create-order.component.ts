import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AtomModule, MoleculesModule } from '@sitec/sarao';
import { SectionTitleComponent } from 'src/app/shared/presentation/components/texts/section-title/section-title.component';

import { ProductsListForOrderCreationComponent } from '../../components/products-list-for-order-creation/products-list-for-order-creation.component';
import { CreateSalesOrderState } from '../../states/create-order.state';
import { Router } from '@angular/router';
import { CartDrawerComponent } from '../../components/cart-drawer/cart-drawer.component';
import { CreateOrderUseCase } from '../../../domain/usecases/create-order.usecase';
import { OrderBaseEntity } from '../../../domain/entities/order.entity';
import { OrderModalComponent } from '../../components/order-modal/order-modal.component';
import { SaraoInputComponent } from 'src/app/shared/presentation/form-components/input copy/input.component';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [
    SectionTitleComponent,
    CommonModule,
    MoleculesModule,
    AtomModule,
    ProductsListForOrderCreationComponent,
    CartDrawerComponent,
    OrderModalComponent,
    SaraoInputComponent
  ],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent {
  
  createSalesOrderState = new CreateSalesOrderState();
  newOrder?: OrderBaseEntity;
  newOrderModalIsOpen = false;
  tests = [
    '.152311-11',
    '152311-11',
    '-152311-11',
    '-152.31.1-11',
    '-152..31.1-11',
    '1-15--2.31.1-11',
    '12-555-52'
  ]
  onPaste(event: ClipboardEvent) {
    console.log('clipboardData', event.clipboardData?.getData('text/plain'))
    console.log(event)
  }
  testt(value: string) {
    let decimals = 2;
    console.log(value)
    if (value[0] === '-') {
      value = '-' + value.substring(1, value.length).replaceAll('-', '')
      console.log(value)
    } else {
      value = value.replaceAll('-', '')
      console.log(value)
    }
    
    if (decimals === 0) {
      value = value.replaceAll('.', '')
      console.log(value)
    } else {
      const indexOfDecimalPoint = value.indexOf('.')
      if (indexOfDecimalPoint !== -1) {
        value = value.substring(0, indexOfDecimalPoint+1) + value.substring(indexOfDecimalPoint + 1, value.length).replaceAll('.', '')
        console.log(value)
      }
    }
    return Number(value).toLocaleString('de-DE')
  }
  constructor(private createOrderUseCase: CreateOrderUseCase) {
    
  }

  createOrder() {
    let createOrderDto = this.createSalesOrderState.getCreateOrderDto();
    this.createOrderUseCase
      .execute(createOrderDto)
      .subscribe({
        next: (resp) =>{
          this.newOrder = resp;
          this.newOrderModalIsOpen = true;
          this.createSalesOrderState.reset();
        },
        error: (e) =>{
          console.error(e)
        }
      })
  }

}