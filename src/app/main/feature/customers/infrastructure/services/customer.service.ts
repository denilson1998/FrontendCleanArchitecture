import { Injectable } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { CustomerGateway } from 'src/app/main/feature/customers/domain/gateways/customer.gateway';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { PagedResponse, PagedResponseModel } from 'src/app/shared/domain/entities/paged-response';
import { ApiService } from 'src/app/shared/infrastructure/services/api.service';
import { environment } from 'src/environments/environment';
import { CreateCustomerDto } from '../../domain/dtos/create-customer.dto';
import { UpdateCustomerDto } from '../../domain/dtos/update-customer.dto';
import { CustomerEntity, CustomerFromListEntity } from '../../domain/entities/customer.entity';
import { CreateCustomerModel, CustomerFromListModel, CustomerModel, UpdateCustomerModel } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends CustomerGateway {

  constructor(private apiService: ApiService) {
    super();
  }

  add(dto: CreateCustomerDto): Observable<CustomerEntity> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    const body = new CreateCustomerModel(dto)
    return this.apiService
      .post<CustomerModel>(
        `${environment.salesApi}/organizations/${userInfo.currentOrganizationId}/customers`,
        body
      )
      .pipe(map((customer) => new CustomerModel(customer).toEntity()));
  }

  update(customer: UpdateCustomerDto): Observable<CustomerEntity> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    const body = new UpdateCustomerModel(customer);
    return this.apiService
      .put<CustomerModel>(
        `${environment.salesApi}/organizations/${userInfo.currentOrganizationId}/customers/${customer.id}`,
        body
      )
      .pipe(map((customer) => new CustomerModel(customer).toEntity()));
  }

  list(params: DataOptions): Observable<PagedResponse<CustomerFromListEntity>> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    return this.apiService
      .getwithPagination<PagedResponseModel<CustomerFromListModel>>(
        `${environment.salesApi}/organizations/${userInfo.currentOrganizationId}/customers`,
        params
      )
      .pipe(map((pagedResponse) => {
        return new PagedResponse<CustomerFromListEntity>(
          pagedResponse.pageNumber,
          pagedResponse.pageSize,
          pagedResponse.totalPages,
          pagedResponse.totalRecords,
          pagedResponse.result.map((item: CustomerFromListModel) => (new CustomerFromListModel(item)).toEntity())
        )
      }));
  }

  get(customerId: number): Observable<CustomerEntity> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    return this.apiService
      .get<CustomerModel>(
        `${environment.salesApi}/organizations/${userInfo.currentOrganizationId}/customers/${customerId}`
      )
      .pipe(map((customer) => new CustomerModel(customer).toEntity()));
  }
}
