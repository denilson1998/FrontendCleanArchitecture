import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { OrderEntity } from 'src/app/main/feature/orders/domain/entities/order.entity';
import { OrderGateway } from '../gateways/order.gateway';
import { UpdateOrderDto } from '../dtos/update-order.dto';

export class UpdateOrderUseCase
  implements UseCase<UpdateOrderDto, OrderEntity>
{
  constructor(private orderRepository: OrderGateway) {}
  execute(updateOrderDto: UpdateOrderDto): Observable<OrderEntity> {
    return this.orderRepository.edit(updateOrderDto);
  }
}
