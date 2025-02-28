import { ActionsQrPaymentsDataRow } from "src/app/main/feature/home/domain/entities/actions-qr-payments.data-row";




export class QrPaymentsDataRow {
    id: number;
    clientName: string;
    createdAt: Date;
    amount: number;
    description: string;
    isExpired: boolean;
    encryptedQrString: string;
    expirationDate: Date;
    actions: ActionsQrPaymentsDataRow;


    constructor(
        id: number,
        clientName: string,
        createdAt: Date,
        amount: number,
        description: string,
        isExpired: boolean,
        encryptedQrString: string,
        expirationDate: Date,
        actions: ActionsQrPaymentsDataRow
    ){
        this.id = id;
        this.clientName = clientName;
        this.createdAt = createdAt;
        this.amount = amount;
        this.description = description;
        this.isExpired = isExpired;
        this.encryptedQrString = encryptedQrString;
        this.expirationDate = expirationDate;
        this.actions = actions;
    }
}