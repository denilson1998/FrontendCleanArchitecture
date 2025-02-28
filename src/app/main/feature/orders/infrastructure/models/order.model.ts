import { CustomerModel } from "../../../customers/infrastructure/models/customer.model";
import { OrderEntity, OrderFromListEntity } from "../../domain/entities/order.entity";
import { OrderFromListOrderItemModel, OrderItemModel } from "./order-item.model";

export class OrderFromListModel {
    id: number;
    billId: number;
    orderCode: number;
    customer: CustomerModel;
    description?: string;
    total: number;
    currency: string;
    createdBy: string;
    createdAt: Date;
    isPaid: boolean;
    isDelivered: boolean;
    isNullified: boolean;
    orderItems: OrderFromListOrderItemModel[];

    constructor(json: any) {
        this.id = json.id;
        this.billId = json.billId;
        this.orderCode = json.orderCode;
        this.customer = new CustomerModel(json.customer);
        this.description = json.description;
        this.total = json.total;
        this.currency = json.currency;
        this.createdBy = json.createdBy;
        this.createdAt = new Date(json.createdAt);
        this.isPaid = json.isPaid;
        this.isDelivered = json.isDelivered;
        this.isNullified = json.isNullified;
        this.orderItems = json.orderItems.map((o: any) => new OrderFromListOrderItemModel(o));
    }

    public toEntity(): OrderFromListEntity {
        return new OrderFromListEntity(
            this.id,
            this.billId,
            this.orderCode,
            this.total,
            this.currency,
            this.createdAt,
            this.isPaid,
            this.isDelivered,
            this.isNullified,
            this.orderItems.map(o =>o.toEntity()),
            this.customer.toEntity(),
            this.createdBy,
            this.description,
        )
    }
}

export class OrderModel {
    id: number;
    billId: number;
    orderCode: number;
    customer: CustomerModel;
    description?: string;
    total: number;
    currency: string;
    createdBy: string;
    createdAt: Date;
    isPaid: boolean;
    isDelivered: boolean;
    isNullified: boolean;
    orderItems: OrderItemModel[];

    constructor(json: any) {
        this.id = json.id;
        this.billId = json.billId;
        this.orderCode = json.orderCode;
        this.customer = new CustomerModel(json.customer);
        this.description = json.description;
        this.total = json.total;
        this.currency = json.currency;
        this.createdBy = json.createdBy;
        this.createdAt = new Date(json.createdAt);
        this.isPaid = json.isPaid;
        this.isDelivered = json.isDelivered;
        this.isNullified = json.isNullified;
        this.orderItems = json.orderItems.map((o: any) => new OrderItemModel(o));
    }

    public toEntity(): OrderEntity {
        return new OrderEntity(
            this.id,
            this.billId,
            this.orderCode,
            this.total,
            this.currency,
            this.createdAt,
            this.isPaid,
            this.isDelivered,
            this.isNullified,
            this.orderItems.map(o =>o.toEntity()),
            this.customer.toEntity(),
            this.createdBy,
            this.description,
        )
    }
}
