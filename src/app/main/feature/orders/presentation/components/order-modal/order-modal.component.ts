import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AtomModule } from '@sitec/sarao';
import { BillEntity } from 'src/app/main/feature/qr-payments/domain/entities/bill.entity';
import { OrderBaseEntity } from '../../../domain/entities/order.entity';
import { GetBillByIdUseCase } from '../../../domain/usecases/get-bill-by-id.usecase';
import { UpdateOrderUseCase } from '../../../domain/usecases/update-order.usecase';
import { OrderDataModule } from '../../../infrastructure/modules/order.data.module';
import { UpdateSalesOrderState } from '../../states/update-order.state';
import { CustomersListForSelectionComponent } from '../customers-list-for-selection/customers-list-for-selection.component';
import { OrderSellerCardComponent } from '../order-seller-card/order-seller-card.component';

@Component({
  selector: 'order-modal',
  standalone: true,
  imports: [
    OrderSellerCardComponent,
    CommonModule,
    CustomersListForSelectionComponent,
    AtomModule,
    OrderDataModule
  ],
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit {
  @Input() order!: OrderBaseEntity;
  @Output() orderHasBeenUpdated = new EventEmitter()
  updateSalesOrderState?: UpdateSalesOrderState;
  sellerAuth0Id?: string;
  bill?: BillEntity;
  currentDrawer: 'order' | 'customer' = 'order';

  orderHasChanged = false;

  constructor(
    private getBillByIdUseCase: GetBillByIdUseCase,
    private updateOrderUseCase: UpdateOrderUseCase,
    ) {
      console.log('constructed')
      console.log(this.order)
  }

  ngOnInit(): void {
    this.updateSalesOrderState = new UpdateSalesOrderState(this.order);
    this.loadBill();
  }

  loadBill(){
    this.getBillByIdUseCase
    .execute(this.order.billId)
    .subscribe({
      next: (resp) =>{
        this.bill = resp;
      },
      error: (e) =>{
        console.error(e)
      }
    })
  }

  openCustomersList() {
    this.currentDrawer = 'customer';
  }

  updateOrder() {
    if (this.updateSalesOrderState?.orderHasChanged) {
      const updateOrderDto = this.updateSalesOrderState?.getUpdateOrderDto();
      this.updateOrderUseCase
      .execute(updateOrderDto)
      .subscribe({
        next: (resp) => {
            this.order = resp;
            this.updateSalesOrderState = new UpdateSalesOrderState(this.order);
            this.orderHasBeenUpdated.emit();
          },
          error: (e) => {
            console.error(e)
          }
        })
    }
  }

  handleCustomersChange(customers: Array<any>) {
    if (customers.length > 0) {
      this.order.customer = customers[0];
      this.updateSalesOrderState?.setCustomerId(this.order.customer.id);
      this.currentDrawer = 'order';
    }
  }
}
