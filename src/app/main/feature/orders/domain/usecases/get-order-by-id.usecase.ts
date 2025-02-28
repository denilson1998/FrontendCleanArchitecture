import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { OrderEntity } from 'src/app/main/feature/orders/domain/entities/order.entity';
import { OrderGateway } from '../gateways/order.gateway';

export class GetOrderByIdUseCase
  implements UseCase<number, OrderEntity>
{
  constructor(private orderRepository: OrderGateway) {}
  execute(orderId: number): Observable<OrderEntity> {
    return this.orderRepository.getByOrderId(orderId);
  }
}
