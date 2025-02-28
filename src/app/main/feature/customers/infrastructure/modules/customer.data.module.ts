import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CustomerGateway } from '../../domain/gateways/customer.gateway';
import { AddCustomerUseCase } from '../../domain/usecases/add-customer.usecase';
import { ListCustomersUseCase } from '../../domain/usecases/list-customers.usecase';
import { UpdateCustomerUseCase } from '../../domain/usecases/update-customer.usecases';
import { CustomerService } from '../services/customer.service';
import { GetCustomerUseCase } from '../../domain/usecases/get-customer.usecase';

@NgModule({
  providers: [
    {
      provide: AddCustomerUseCase,
      useFactory: (customerRepo: CustomerGateway) => new AddCustomerUseCase(customerRepo),
      deps: [CustomerGateway],
    },
    {
      provide: UpdateCustomerUseCase,
      useFactory: (customerRepo: CustomerGateway) => new UpdateCustomerUseCase(customerRepo),
      deps: [CustomerGateway],
    },
    {
      provide: ListCustomersUseCase,
      useFactory: (customerRepo: CustomerGateway) => new ListCustomersUseCase(customerRepo),
      deps: [CustomerGateway],
    },
    {
      provide: GetCustomerUseCase,
      useFactory: (customerRepo: CustomerGateway) => new GetCustomerUseCase(customerRepo),
      deps: [CustomerGateway],
    },
    {
      provide: CustomerGateway,
      useClass: CustomerService,
    },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class CustomerDataModule {}
