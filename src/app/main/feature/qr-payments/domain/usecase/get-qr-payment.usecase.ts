import { Observable } from "rxjs";
import { DataOptions } from "src/app/shared/domain/entities/data-options";
import { UseCase } from "src/app/shared/domain/usecases/use-case";
import { ListQrPaymentEntity } from "../entities/list-qr-payments.entity";
import { QrPaymentsGateway } from "../gateway/qr-payments.gateway";







export class QrPaymentGetUseCase implements UseCase<DataOptions, ListQrPaymentEntity> {
    constructor(private paymentRepository: QrPaymentsGateway){}

    execute(params: DataOptions): Observable<ListQrPaymentEntity> {
        return this.paymentRepository.getPayments(params);
    }
}