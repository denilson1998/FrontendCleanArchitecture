import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { OrderGateway } from '../../domain/gateways/order.gateway';
import { CreateOrderUseCase } from '../../domain/usecases/create-order.usecase';
import { GetBillByIdUseCase } from '../../domain/usecases/get-bill-by-id.usecase';
import { GetOrderByIdUseCase } from '../../domain/usecases/get-order-by-id.usecase';
import { ListOrdersUseCase } from '../../domain/usecases/list-orders.usecase';
import { UpdateOrderUseCase } from '../../domain/usecases/update-order.usecase';
import { OrderService } from '../services/order.service';

@NgModule({
  providers: [
    {
      provide: UpdateOrderUseCase,
      useFactory: (orderRepo: OrderGateway) => new UpdateOrderUseCase(orderRepo),
      deps: [OrderGateway],
    },
    {
      provide: CreateOrderUseCase,
      useFactory: (orderRepo: OrderGateway) => new CreateOrderUseCase(orderRepo),
      deps: [OrderGateway],
    },
    {
      provide: GetOrderByIdUseCase,
      useFactory: (orderRepo: OrderGateway) => new GetOrderByIdUseCase(orderRepo),
      deps: [OrderGateway],
    },
    {
      provide: ListOrdersUseCase,
      useFactory: (orderRepo: OrderGateway) => new ListOrdersUseCase(orderRepo),
      deps: [OrderGateway],
    },
    {
      provide: GetBillByIdUseCase,
      useFactory: (orderRepo: OrderGateway) => new GetBillByIdUseCase(orderRepo),
      deps: [OrderGateway],
    },
    {
      provide: OrderGateway,
      useClass: OrderService,
    },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class OrderDataModule {}
