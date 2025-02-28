import { BankAccountType } from "src/app/shared/domain/enums/banckAccountType";
import { Currency } from "src/app/shared/domain/enums/currency";

export class QrDetailEntity{
    id?: number;
    qrId: string;
    clientName: string;
    description: string;
    amount: number;
    bankAccountNumber: number;
    currency: Currency;
    bankAccountType: BankAccountType;
    isPaid: boolean;
    encryptedQrString: string;
    expirationDate: string;
    organizationId: number;

    constructor(
        id: number,
        qrId: string,
        clientName: string,
        description: string,
        amount: number,
        bankAccountNumber: number,
        currency: Currency,
        bankAccountType: BankAccountType,
        isPaid: boolean,
        encryptedQrString: string,
        expirationDate: string,
        organizationId: number,
    ) {
        this.id = id;
        this.qrId = qrId;
        this.clientName = clientName;
        this.description = description;
        this.amount = amount;
        this.bankAccountNumber = bankAccountNumber;
        this.currency = currency;
        this.bankAccountType = bankAccountType;
        this.isPaid = isPaid;
        this.encryptedQrString = encryptedQrString;
        this.expirationDate = expirationDate;
        this.organizationId = organizationId;
    }
}
