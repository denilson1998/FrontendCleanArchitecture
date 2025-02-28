export class OrderDataRow {
    id: number;
    orderCode?: number;
    customerName?: string;
    description?: string;
    total?: number;
    currency?: string;
    createdAt?: Date;
    isPaid?: boolean;
    isDelivered?: boolean;
    isNullified?: boolean;

    constructor(
      id: number,
      orderCode?: number,
      customerName?: string,
      description?: string,
      total?: number,
      currency?: string,
      createdAt?: Date,
      isPaid?: boolean,
      isDelivered?: boolean,
      isNullified?: boolean,
    ) {
      this.id = id;
      this.orderCode = orderCode;
      this.customerName = customerName;
      this.description = description;
      this.total = total;
      this.currency = currency;
      this.createdAt = createdAt;
      this.isPaid = isPaid;
      this.isDelivered = isDelivered;
      this.isNullified = isNullified;
    }
}
