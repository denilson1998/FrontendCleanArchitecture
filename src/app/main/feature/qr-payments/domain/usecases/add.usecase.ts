import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { PaymentsModel } from '../../infraestructure/models/payments.model';
import { PaymentsEntity } from '../entities/payments.entity';
import { QrPaymentsGateway } from '../gateway/qr-payments.gateway';

export class QrPaymentsAddUseCase
  implements UseCase<PaymentsModel, PaymentsEntity>
{
  constructor(private paymentsRepository: QrPaymentsGateway) {}
  execute(params: PaymentsModel): Observable<PaymentsEntity> {
    return this.paymentsRepository.add(params);
  }
}