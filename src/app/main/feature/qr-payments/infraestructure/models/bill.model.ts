import { BillEntity } from "../../domain/entities/bill.entity";
import { PaymentsModel } from "./payments.model";

export class BillModel  {
    id: number;
    organizationId: number;
    totalAmount: number;
    isCompleted: boolean;
    payments : Array<PaymentsModel>;
    change: number;
    constructor(json: any) {
        this.id = json.id;
        this.organizationId = json.organizationId;
        this.totalAmount = json.totalAmount;
        this.isCompleted = json.isCompleted;
        this.payments = json.payments.map((o: any) => new PaymentsModel(o));
        this.change = this.payments.map(o =>o.change).reduce((totalChange, change) => totalChange + (change ?? 0), 0) ?? 0;
    }

    public toEntity(): BillEntity {
        return new BillEntity(
            this.id,
            this.totalAmount,
            this.payments.reduce((total, payment) => total + payment.paidAmount, 0),
            this.isCompleted,
            this.payments.map(o =>o.toEntity()),
            this.change
        );
    }
}
