import { QrPaymentsDataRow } from "./data-row-entities/qr-payments.data-row";
import { QrDetail } from "./qr-details.entity";




export class QrPaymentEntity {
    id : number;
    organizationId: number;
    qrDetail: QrDetail;
    amount: number;
    currency: string;
    paymentMethod: string;
    createdAt: Date;


    constructor(payment: QrPaymentEntity){
        this.id = payment.id;
        this.organizationId = payment.organizationId;
        this.amount = payment.amount;
        this.currency = payment.currency;
        this.paymentMethod = payment.paymentMethod;
        this.createdAt = payment.createdAt;
        this.qrDetail = payment.qrDetail;
    }

    public convertToDataRow() {
        return new QrPaymentsDataRow(
            this.id,
            this.qrDetail.clientName,
            this.createdAt,
            this.qrDetail.amount,
            this.qrDetail.description,
            this.qrDetail.isExpired,
            this.qrDetail.encryptedQrString,
            this.qrDetail.expirationDate,
            {
                seeQr: true,
                expiredQr: false
            }
        )
    }
}

