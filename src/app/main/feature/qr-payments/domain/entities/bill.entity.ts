import { PaymentsEntity } from "./payments.entity";

export class BillEntity {
    id: number;
    totalAmount: number;
    paidAmount: number;
    isCompleted: boolean;
    payments: Array<PaymentsEntity>;
    change: number;

    constructor(
        id: number,
        totalAmount: number,
        paidAmount: number,
        isCompleted: boolean,
        payments: Array<PaymentsEntity>,
        change: number,
    ) {
        this.id = id;
        this.totalAmount = totalAmount;
        this.paidAmount = paidAmount;
        this.isCompleted = isCompleted;
        this.payments = payments;
        this.change = change;
    }
}
