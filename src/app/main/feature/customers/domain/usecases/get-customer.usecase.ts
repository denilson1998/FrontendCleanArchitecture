import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { CustomerGateway } from '../gateways/customer.gateway';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { CustomerEntity, CustomerFromListEntity } from '../entities/customer.entity';

  export class GetCustomerUseCase
  implements UseCase<number, CustomerEntity>
{
  constructor(private customerRepository: CustomerGateway) {}
  execute(customerId: number): Observable<CustomerEntity> {
    return this.customerRepository.get(customerId);
  }
}
