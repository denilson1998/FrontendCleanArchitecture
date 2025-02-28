import { OrderFromListOrderItemEntity, OrderItemEntity } from "../../domain/entities/orderItem.entity";

export class OrderFromListOrderItemModel {
    id: number;
    productName: string;
    productId: number;
    quantity: number;
    price: number;
    currency: string;

    constructor(json: any) {
        this.id = json.id;
        this.productName = json.productName;
        this.productId = json.productId;
        this.quantity = json.quantity;
        this.price = json.price;
        this.currency = json.currency;
    }

    public toEntity(): OrderFromListOrderItemEntity {
        return new OrderFromListOrderItemEntity(
            this.id,
            this.productName,
            this.productId,
            this.quantity,
            this.price,
            this.currency,
        )
    }
}

export class OrderItemModel {
    id: number;
    productName: string;
    productId: number;
    quantity: number;
    price: number;
    currency: string;

    constructor(json: any) {
        this.id = json.id;
        this.productName = json.productName;
        this.productId = json.productId;
        this.quantity = json.quantity;
        this.price = json.price;
        this.currency = json.currency;
    }

    public toEntity(): OrderItemEntity {
        return new OrderItemEntity(
            this.id,
            this.productName,
            this.productId,
            this.quantity,
            this.price,
            this.currency,
        )
    }
}
