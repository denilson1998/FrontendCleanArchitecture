import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { CustomerGateway } from '../gateways/customer.gateway';
import { CustomerEntity } from '../entities/customer.entity';
import { CreateCustomerDto } from '../dtos/create-customer.dto';

export class AddCustomerUseCase
  implements UseCase<CreateCustomerDto, CustomerEntity>
{
  constructor(private customerRepository: CustomerGateway) {}
  execute(dto: CreateCustomerDto): Observable<CustomerEntity> {
    return this.customerRepository.add(dto);
  }
}
