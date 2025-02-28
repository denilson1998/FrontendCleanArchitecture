export class OrderFromListOrderItemEntity {
    id: number;
    productName: string;
    productId: number;
    quantity: number;
    price: number;
    currency: string;

    constructor(
        id: number,
        productName: string,
        productId: number,
        quantity: number,
        price: number,
        currency: string,
    ) {
        this.id = id;
        this.productName = productName;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.currency = currency;
    }
}

export class OrderItemEntity {
    id: number;
    productName: string;
    productId: number;
    quantity: number;
    price: number;
    currency: string;

    constructor(
        id: number,
        productName: string,
        productId: number,
        quantity: number,
        price: number,
        currency: string,
    ) {
        this.id = id;
        this.productName = productName;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.currency = currency;
    }
}
