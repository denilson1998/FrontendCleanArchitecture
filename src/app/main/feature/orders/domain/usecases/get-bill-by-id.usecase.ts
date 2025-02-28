import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { OrderEntity, OrderFromListEntity } from 'src/app/main/feature/orders/domain/entities/order.entity';
import { OrderGateway } from '../gateways/order.gateway';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { PagedResponse } from 'src/app/shared/domain/entities/paged-response';
import { UserEntity } from '../../../auth/domain/entities/user.entity';
import { BillEntity } from '../../../qr-payments/domain/entities/bill.entity';


export class GetBillByIdUseCase
  implements UseCase<number, BillEntity>
{
  constructor(private orderRepository: OrderGateway) {}
  execute(billId: number): Observable<BillEntity> {
    return this.orderRepository.getBillById(billId);
  }
}
