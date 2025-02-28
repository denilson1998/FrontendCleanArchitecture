import { CustomerEntity } from "../../../customers/domain/entities/customer.entity";
import { OrderDataRow } from "./data-row-entities/orders.data-row";
import { OrderFromListOrderItemEntity, OrderItemEntity } from "./orderItem.entity";

export class OrderBaseEntity {
    id: number;
    billId: number;
    orderCode: number;
    customer: CustomerEntity;
    description?: string;
    total: number;
    currency: string;
    createdAt: Date;
    isPaid: boolean;
    isDelivered: boolean;
    isNullified: boolean;
    orderItems: OrderFromListOrderItemEntity[];
    createdBy?: string;

    constructor(
        id: number,
        billId: number,
        orderCode: number,
        total: number,
        currency: string,
        createdAt: Date,
        isPaid: boolean,
        isDelivered: boolean,
        isNullified: boolean,
        orderItems: OrderFromListOrderItemEntity[],
        customer: CustomerEntity,
        createdBy?: string,
        description?: string,
    ) {
        this.id = id;
        this.billId = billId;
        this.orderCode = orderCode;
        this.customer = customer;
        this.description = description;
        this.total = total;
        this.currency = currency;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.isPaid = isPaid;
        this.isDelivered = isDelivered;
        this.isNullified = isNullified;
        this.orderItems = orderItems;
    }

    public convertToDataRow() {
        return new OrderDataRow(
            this.id,
            this.orderCode,
            this.customer?.fullName ?? '',
            this.description,
            this.total,
            this.currency,
            this.createdAt,
            this.isPaid,
            this.isDelivered,
            this.isNullified,
        );
    }
}

export class OrderFromListEntity extends OrderBaseEntity {
    constructor(
        id: number,
        billId: number,
        orderCode: number,
        total: number,
        currency: string,
        createdAt: Date,
        isPaid: boolean,
        isDelivered: boolean,
        isNullified: boolean,
        orderItems: OrderItemEntity[],
        customer: CustomerEntity,
        createdBy?: string,
        description?: string,
    ) {
        super(
            id,
            billId,
            orderCode,
            total,
            currency,
            createdAt,
            isPaid,
            isDelivered,
            isNullified,
            orderItems,
            customer,
            createdBy,
            description,
        )
    }
}

export class OrderEntity extends OrderBaseEntity {

    constructor(
        id: number,
        billId: number,
        orderCode: number,
        total: number,
        currency: string,
        createdAt: Date,
        isPaid: boolean,
        isDelivered: boolean,
        isNullified: boolean,
        orderItems: OrderItemEntity[],
        customer: CustomerEntity,
        createdBy?: string,
        description?: string,
    ) {
        super(
            id,
            billId,
            orderCode,
            total,
            currency,
            createdAt,
            isPaid,
            isDelivered,
            isNullified,
            orderItems,
            customer,
            createdBy,
            description,
        )
    }
}
