import { PaymentMethod } from "src/app/shared/domain/enums/paymenetMethod";
import { roundToTwoDecimals } from "src/app/shared/domain/utils/numbers.utils";

export class CreateOrderDto {
    customerId: number;
    description: string;
    total: number;
    isPaid: boolean;
    isDelivered: boolean;
    orderItems: CreateOrderItemDto[];
    payments: CreateOrderPaymentDto[];

    constructor(
        customerId: number,
        description: string,
        total: number,
        isPaid: boolean,
        isDelivered: boolean,
        orderItems: CreateOrderItemDto[],
        payments: CreateOrderPaymentDto[]
    ) {
        this.customerId = customerId;
        this.description = description;
        this.total = total;
        this.isPaid = isPaid;
        this.isDelivered = isDelivered;
        this.orderItems = orderItems;
        this.payments = payments;
    }
}

export class CreateOrderItemDto {
    productId: number;
    quantity: number;
    price: number;
    constructor(
        productId: number,
        quantity: number,
        price: number
    ) {
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }
}

export class CreateOrderPaymentDto {
    paidAmount: number;
    paymentMethod: PaymentMethod;
    constructor(
        amount: number,
        paymentMethod: PaymentMethod,
    ) {
        this.paidAmount = amount;
        if (typeof(amount) === 'string') {
            this.paidAmount = roundToTwoDecimals(amount);
        }
        this.paymentMethod = paymentMethod;
    }
}
