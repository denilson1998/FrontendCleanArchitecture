import { BankAccountType } from "src/app/shared/domain/enums/banckAccountType";
import { Currency } from "src/app/shared/domain/enums/currency";
import { PaymentMethod } from "src/app/shared/domain/enums/paymenetMethod";
import { PaymentsEntity } from "../../domain/entities/payments.entity";
import { QrDetailModel } from "./qrDetail.model";
export class PaymentsModel  {
    id: number;
    qrDetail?: QrDetailModel;
    amount: number;
    paidAmount: number;
    currency: Currency;
    paymentMethod: PaymentMethod;
    qrDescription: string;
    createdAt: Date;
    change: number;

    constructor(json: any) {
        this.id = json.id;
        this.amount = json.amount;
        this.paidAmount = json.paidAmount;
        this.currency = json.currency;
        this.paymentMethod = json.paymentMethod;
        this.qrDescription = json.qrDescription;
        this.change = json.change;
        this.createdAt = new Date(json.createdAt);
    }

    public toEntity(): PaymentsEntity {
        return new PaymentsEntity(
            this.id,
            this.amount,
            this.paidAmount,
            this.currency,
            this.paymentMethod,
            this.createdAt,
            this.qrDetail?.toEntity(),
            this.change,
        );
    }
}