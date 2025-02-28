import { BankAccountType } from "src/app/shared/domain/enums/banckAccountType";
import { Currency } from "src/app/shared/domain/enums/currency";
import { PaymentMethod } from "src/app/shared/domain/enums/paymenetMethod";
import { QrDetailEntity } from "./qrDetail.entity";

export class PaymentsEntity {
    id: number;
    qrDetail?: QrDetailEntity;
    amount: number;
    paidAmount: number;
    currency: Currency;
    paymentMethod: PaymentMethod;
    createdAt: Date;
    change?: number;
    constructor(
        id: number,
        amount: number,
        paidAmount: number,
        currency: Currency,
        paymentMethod: PaymentMethod,
        createdAt: Date,
        qrDetail?: QrDetailEntity,
        change?: number,
    ) {
        this.id = id;
        this.qrDetail = qrDetail;
        this.amount = amount;
        this.paidAmount = paidAmount;
        this.currency = currency;
        this.createdAt = createdAt;
        this.paymentMethod = paymentMethod;
        this.change = change;
    }
    get paymentMethodInSpanish() {
        switch (this.paymentMethod) {
            case PaymentMethod.Cash:
                return "Efectivo";
            case PaymentMethod.Transfer:
                return "Transferencia";
            case PaymentMethod.Card:
                return "Tarjeta de Débito/Crédito";
            case PaymentMethod.QR:
                return "QR";
            default:
                return "Efectivo";
        }
    }
}
