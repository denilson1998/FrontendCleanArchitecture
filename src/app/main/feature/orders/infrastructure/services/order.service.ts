import { Injectable } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { OrderEntity, OrderFromListEntity } from 'src/app/main/feature/orders/domain/entities/order.entity';
import { OrderGateway } from 'src/app/main/feature/orders/domain/gateways/order.gateway';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { PagedResponse, PagedResponseModel } from 'src/app/shared/domain/entities/paged-response';
import { ApiService } from 'src/app/shared/infrastructure/services/api.service';
import { environment } from 'src/environments/environment';
import { UserEntity } from '../../../auth/domain/entities/user.entity';
import { OrganizationMapper } from '../../../organization/infrastructure/helpers/mappers/organization.mapper';
import { BillEntity } from '../../../qr-payments/domain/entities/bill.entity';
import { BillModel } from '../../../qr-payments/infraestructure/models/bill.model';
import { CreateOrderDto } from '../../domain/dtos/create-order.dto';
import { UpdateOrderDto } from '../../domain/dtos/update-order.dto';
import { CreateOrderCommand } from '../commands/create-order.command';
import { UpdateOrderCommand } from '../commands/update-order.command';
import { OrderFromListModel, OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends OrderGateway {
  organizationMapper = new OrganizationMapper();
  constructor(private apiService: ApiService) {
    super();
  }

  add(createOrderDto: CreateOrderDto): Observable<OrderEntity> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    let createOrderCommand = new CreateOrderCommand(createOrderDto);
    return this.apiService
      .post<CreateOrderCommand>(
        `${environment.salesApi}/organizations/${userInfo.currentOrganizationId}/orders`,
        createOrderCommand
      )
      .pipe(
        map((item) => new OrderModel(item).toEntity()));
  }

  edit(dto: UpdateOrderDto): Observable<OrderEntity> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    const body = new UpdateOrderCommand(dto);
    return this.apiService
      .patch<OrderModel>(
        `${environment.salesApi}/organizations/${userInfo.currentOrganizationId}/orders/${body.id}`,
        body
      )
      .pipe(
        tap(item => console.log(item)),
        map((result) => new OrderModel(result).toEntity()));
  }

  delete(orderId: number): Observable<void> {
    throw new Error('Method not implemented.');
  }

  getByOrderId(orderId: number): Observable<OrderEntity> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    return this.apiService
      .get<OrderModel>(
        `${environment.salesApi}/organizations/${userInfo.currentOrganizationId}/orders/${orderId}`
      )
      .pipe(
        map((item) => new OrderModel(item).toEntity()));
  }

  getByBillId(billId: number): Observable<OrderFromListEntity> {
    throw new Error('Method not implemented.');
  }

  getBillById(billId: number): Observable<BillEntity> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    return this.apiService
      .get<BillModel>(
        `${environment.paymentsApi}/organizations/${userInfo.currentOrganizationId}/bills/${billId}`,
      )
      .pipe(
        map((result) => new BillModel(result).toEntity()));
  }

  getByOrganization(dataOptions: DataOptions): Observable<PagedResponse<OrderFromListEntity>> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    return this.apiService
      .getwithPagination<PagedResponseModel<OrderFromListModel>>(
        `${environment.salesApi}/organizations/${userInfo.currentOrganizationId}/orders`,
        dataOptions
      )
      .pipe(
        tap(item => console.log(item)),
        map((pagedResponse) => {
        return new PagedResponse<OrderFromListEntity>(
          pagedResponse.pageNumber,
          pagedResponse.pageSize,
          pagedResponse.totalPages,
          pagedResponse.totalRecords,
          pagedResponse.result.map((item: OrderFromListModel) => (new OrderFromListModel(item)).toEntity())
        )
      }));
  }
}
