import { OrderFromListEntity } from 'src/app/main/feature/orders/domain/entities/order.entity';
import { Mapper } from 'src/app/shared/infrastructure/helpers/maps/mapper';
import { OrderFromListModel } from '../../models/order.model';

export class OrderMapper extends Mapper<OrderFromListEntity, OrderFromListModel> {
  mapFrom(param: OrderFromListEntity): OrderFromListModel {
    throw new Error('Method not implemented.');
  }
  mapTo(param: OrderFromListModel): OrderFromListEntity {
    throw new Error('Method not implemented.');
  }
}
