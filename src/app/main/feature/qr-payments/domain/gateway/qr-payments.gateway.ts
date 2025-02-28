import { Observable } from 'rxjs';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { ListGroupedQrDetailModel } from 'src/app/main/feature/qr-payments/infraestructure/models/ListGroupedQr.model';
import { ListQrPaymentByQrModel, qrInfoModel } from '../../infraestructure/models/listQrPaymentsByQr.mode';
import { PaymentsModel } from '../../infraestructure/models/payments.model';
import { ListQrPaymentEntity } from '../entities/list-qr-payments.entity';
import { PaymentsEntity } from '../entities/payments.entity';

export abstract class QrPaymentsGateway {
    abstract add(params: PaymentsModel): Observable<PaymentsEntity>;
    abstract getGroupedQrDetail(): Observable<ListGroupedQrDetailModel>;
    abstract getQrPaymentById(params: qrInfoModel): Observable<ListQrPaymentByQrModel>;
    abstract getPayments(params: DataOptions): Observable<ListQrPaymentEntity>;
}
