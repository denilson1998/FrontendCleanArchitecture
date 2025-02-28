import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { CustomerGateway } from '../gateways/customer.gateway';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { PagedResponse } from 'src/app/shared/domain/entities/paged-response';
import { CustomerFromListEntity } from '../entities/customer.entity';

export class ListCustomersUseCase
  implements UseCase<DataOptions, PagedResponse<CustomerFromListEntity>>
{
  constructor(private customerRepository: CustomerGateway) {}
  execute(params: DataOptions): Observable<PagedResponse<CustomerFromListEntity>> {
    return this.customerRepository.list(params);
  }
}
