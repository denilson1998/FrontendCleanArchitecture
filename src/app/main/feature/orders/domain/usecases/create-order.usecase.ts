import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { OrderEntity } from 'src/app/main/feature/orders/domain/entities/order.entity';
import { OrderGateway } from '../gateways/order.gateway';
import { CreateOrderDto } from '../dtos/create-order.dto';

export class CreateOrderUseCase
  implements UseCase<CreateOrderDto, OrderEntity>
{
  constructor(private orderRepository: OrderGateway) {}
  execute(createOrderDto: CreateOrderDto): Observable<OrderEntity> {
    return this.orderRepository.add(createOrderDto);
  }
}
