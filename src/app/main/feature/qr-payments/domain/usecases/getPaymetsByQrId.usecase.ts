import { Observable } from "rxjs";
import { UseCase } from "src/app/shared/domain/usecases/use-case";
import { ListQrPaymentByQrModel, qrInfoModel } from "../../infraestructure/models/listQrPaymentsByQr.mode";
import { QrDetailEntity } from "../entities/qrDetail.entity";
import { QrPaymentsGateway } from "../gateway/qr-payments.gateway";

export class QrPaymentsByQrIdUseCase
  implements UseCase<qrInfoModel, ListQrPaymentByQrModel>
{
  constructor(private paymentsRepository: QrPaymentsGateway) {}
  execute(params: qrInfoModel): Observable<ListQrPaymentByQrModel> {
    return this.paymentsRepository.getQrPaymentById(params);
  }
}