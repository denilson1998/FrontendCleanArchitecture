import { BankAccountType } from "src/app/shared/domain/enums/banckAccountType";
import { Currency } from "src/app/shared/domain/enums/currency";
import { QrDetailEntity } from "../../domain/entities/qrDetail.entity";

export class QrDetailModel{
    id: number;
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
    constructor(json: any) {
        this.id = json.id;
        this.qrId = json.qrId;
        this.clientName = json.clientName;
        this.description = json.description;
        this.amount = json.amount;
        this.bankAccountNumber = json.bankAccountNumber;
        this.currency = json.currency;
        this.bankAccountType = json.bankAccountType;
        this.isPaid = json.isPaid;
        this.encryptedQrString = json.encryptedQrString;
        this.expirationDate = json.expirationDate;
        this.organizationId = json.organizationId;
    }

    public toEntity(): QrDetailEntity {
        return new QrDetailEntity(
            this.id,
            this.qrId,
            this.clientName,
            this.description,
            this.amount,
            this.bankAccountNumber,
            this.currency,
            this.bankAccountType,
            this.isPaid,
            this.encryptedQrString,
            this.expirationDate,
            this.organizationId,
        );
    }
}
