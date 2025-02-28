import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerDataModule } from '../../../infrastructure/modules/customer.data.module';
import { GetCustomerUseCase } from '../../../domain/usecases/get-customer.usecase';
import { CustomerEntity } from '../../../domain/entities/customer.entity';
import { OrderFromListEntity } from 'src/app/main/feature/orders/domain/entities/order.entity';
import { SectionSubtitleComponent } from 'src/app/shared/presentation/components/texts/subtitle-section/section-subtitle.component';
import { AtomModule, ChartsModule, MoleculesModule } from '@sitec/sarao';
import { CustomerOrdersListComponent } from '../../components/customer-orders-list/customer-orders-list.component';
import { CustomerSoldProductsListComponent } from '../../components/customer-sold-products-list/customer-sold-products-list.component';
import { EditCustomerModalComponent } from '../../components/edit-customer-modal/edit-customer-modal.component';

@Component({
  selector: 'app-customer-page',
  standalone: true,
  imports: [
    CommonModule,
    CustomerDataModule,
    SectionSubtitleComponent,
    AtomModule,
    ChartsModule,
    CustomerOrdersListComponent,
    CustomerSoldProductsListComponent,
    MoleculesModule,
    EditCustomerModalComponent
  ],
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.scss']
})
export class CustomerPageComponent {
  customerIdString?: string;
  customer?: CustomerEntity;
  orders?: Array<OrderFromListEntity>

  currency = "Bs";

  editCustomerModalIsShown = false;

  constructor(
    private getCustomerUseCase: GetCustomerUseCase,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe( paramMap => {
      this.customerIdString = paramMap.get('customerId')!;
      this.loadCustomer();
    });
  }

  get ordersLastDate() {
    return this.orders?.map((order) => order.createdAt).sort((a, b) => b.getTime() - a.getTime())[0];
  }

  get productsTotal() {
    if (!this.orders) {
      return 0;
    }
    return this.orders
      .filter(o => !o.isNullified)
      .reduce((total, order) => total + order.orderItems.reduce((total, orderItem) => total + orderItem.quantity, 0), 0) ?? 0;
  }

  get ordersTotal() {
    return this.orders?.reduce((total, order) => total + order.total, 0) ?? 0;
  }

  get paidOrdersTotal() {
    return this.orders?.reduce((total, order) => total + order.total, 0) ?? 0;
  }

  handleOrdersLoaded(orders: Array<OrderFromListEntity>) {
    this.orders = orders.filter((order) => order.isNullified === false);
  }

  loadCustomer() {
    const customerId = Number(this.customerIdString);
    if (Number.isNaN(customerId)) {
      return;
    }
    this.getCustomerUseCase
      .execute(customerId)
      .subscribe(
        {
          next: (resp) => {
            this.customer = resp;
          }
        }
      )
  }
  showEditCustomerModal() {
    this.editCustomerModalIsShown = true;
  }

  handleCustomerEdited() {
    this.loadCustomer();
    this.editCustomerModalIsShown = false;
  }
}
