import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { CustomerGateway } from '../gateways/customer.gateway';
import { CustomerEntity } from '../entities/customer.entity';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';

export class UpdateCustomerUseCase
  implements UseCase<CustomerEntity, CustomerEntity>
{
  constructor(private customerRepository: CustomerGateway) {}
  execute(customer: UpdateCustomerDto): Observable<CustomerEntity> {
    return this.customerRepository.update(customer);
  }
}
