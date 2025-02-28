import { Observable } from 'rxjs';
import { OrderFromListModel } from '../../infrastructure/models/order.model';
import { OrderEntity, OrderFromListEntity } from 'src/app/main/feature/orders/domain/entities/order.entity';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { PagedResponse } from 'src/app/shared/domain/entities/paged-response';
import { UserEntity } from '../../../auth/domain/entities/user.entity';
import { BillEntity } from '../../../qr-payments/domain/entities/bill.entity';
import { CreateOrderCommand } from '../../infrastructure/commands/create-order.command';
import { UpdateOrderCommand } from '../../infrastructure/commands/update-order.command';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';

export abstract class OrderGateway {
  abstract add(createOrderCommand: CreateOrderDto): Observable<OrderEntity>;
  abstract edit(params: UpdateOrderDto): Observable<OrderEntity>;
  abstract delete(orderId: number): Observable<void>;
  abstract getByOrderId(orderId: number): Observable<OrderEntity>;
  abstract getByBillId(billId: number): Observable<OrderFromListEntity>;
  abstract getBillById(billId: number): Observable<BillEntity>;
  abstract getByOrganization(params: DataOptions): Observable<PagedResponse<OrderFromListEntity>>;
}
