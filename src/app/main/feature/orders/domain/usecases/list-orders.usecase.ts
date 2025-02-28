import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { OrderFromListEntity } from 'src/app/main/feature/orders/domain/entities/order.entity';
import { OrderGateway } from '../gateways/order.gateway';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { PagedResponse } from 'src/app/shared/domain/entities/paged-response';

export class ListOrdersUseCase
  implements UseCase<DataOptions, PagedResponse<OrderFromListEntity>>
{
  constructor(private orderRepository: OrderGateway) {}
  execute(params: DataOptions): Observable<PagedResponse<OrderFromListEntity>> {
    return this.orderRepository.getByOrganization(params);
  }
}
