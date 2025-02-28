import { Observable } from "rxjs";
import { UseCase } from "src/app/shared/domain/usecases/use-case";
import { ListGroupedQrDetailModel } from "../../infraestructure/models/ListGroupedQr.model";
import { GroupedQrDetailEntity } from "../entities/groupedQrDetail.entity";
import { QrPaymentsGateway } from "../gateway/qr-payments.gateway";

export class QrPaymentsGetGroupQrUseCase

  implements UseCase<GroupedQrDetailEntity,ListGroupedQrDetailModel>
{
  constructor(private paymentsRepository: QrPaymentsGateway) {}
  execute(): Observable<ListGroupedQrDetailModel> {
    return this.paymentsRepository.getGroupedQrDetail();
  }
}