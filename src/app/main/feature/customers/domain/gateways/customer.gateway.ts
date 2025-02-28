import { Observable } from 'rxjs';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { PagedResponse } from 'src/app/shared/domain/entities/paged-response';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { CustomerEntity, CustomerFromListEntity } from '../entities/customer.entity';

export abstract class CustomerGateway {
  abstract add(dto: CreateCustomerDto): Observable<CustomerEntity>;
  abstract update(customer: UpdateCustomerDto): Observable<CustomerEntity>;
  abstract list(params: DataOptions): Observable<PagedResponse<CustomerFromListEntity>>;
  abstract get(customerId: number): Observable<CustomerEntity>;
}
