import { PaymentMethod } from "src/app/shared/domain/enums/paymenetMethod";
import { CreateOrderDto, CreateOrderItemDto, CreateOrderPaymentDto } from "../../domain/dtos/create-order.dto";
import { roundToTwoDecimals } from "src/app/shared/domain/utils/numbers.utils";

export class CreateOrderCommand {
    customerId: number;
    description?: string;
    total: number;
    isPaid: boolean;
    isDelivered: boolean;
    orderItems: CreateOrderItemCommand[];
    payments?: CreateOderPaymentCommand[];

    constructor(dto: CreateOrderDto) {
        this.customerId = dto.customerId;
        this.total = dto.total;
        const totalPaid = dto.payments.reduce((total, payment) => total + payment.paidAmount, 0);
        this.isPaid = totalPaid - dto.total > 0.01;
        this.isDelivered = dto.isDelivered;
        this.orderItems = dto.orderItems.map((item) => new CreateOrderItemCommand(item));
        this.description = dto.description;
        this.payments = createOrderPayments(dto.payments.filter(p => p.paidAmount != 0), dto.total);
        if (this.payments.some(p => p.change < 0)) {
            throw new Error(`Invalid calculated change, ${dto}`);
        }
        if (this.payments.some(p => p.paidAmount < 0)) {
            throw new Error(`Invalid calculated paidAmount, ${dto}`);
        }
        if (this.payments.some(p => p.amount < 0)) {
            throw new Error(`Invalid calculated amount, ${dto}`);
        }
    }
}

export class CreateOrderItemCommand {
    productId: number;
    quantity: number;
    price: number;
    constructor(dto: CreateOrderItemDto) {
        this.productId = dto.productId;
        this.quantity = dto.quantity;
        this.price = dto.price;
    }
}

function createOrderPayments(paymentsDto: Array<CreateOrderPaymentDto>, total: number): Array<CreateOderPaymentCommand> {
    const totalPaid = paymentsDto.reduce((total, payment) => total + payment.paidAmount, 0);
    const hasChange = totalPaid - total > 0.01
    const totalChange = hasChange ? totalPaid - total : 0;

    const paymentCandidateForChange = paymentsDto.find((payment) => payment.paidAmount > totalChange);
    if (paymentCandidateForChange) {
        return paymentsDto.map((item) => {
            if (item.paymentMethod === paymentCandidateForChange.paymentMethod) {
                return new CreateOderPaymentCommand(item, totalChange);
            }
            return new CreateOderPaymentCommand(item, 0)
        });
    }
    let paymentsCommands: Array<CreateOderPaymentCommand> = [];
    let remainingChange = totalChange;
    paymentsDto.forEach((payment) => {
        const paidChange = payment.paidAmount > remainingChange ? remainingChange : payment.paidAmount;
        const paymentCommand = new CreateOderPaymentCommand(payment, paidChange);
        paymentsCommands.push(paymentCommand);
        remainingChange = roundToTwoDecimals(remainingChange - paidChange);
    });
    return paymentsCommands;
}

export class CreateOderPaymentCommand {
    amount: number;
    paidAmount: number;
    paymentMethod: PaymentMethod;
    change: number;
    constructor(dto: CreateOrderPaymentDto, change: number) {
        this.amount = roundToTwoDecimals(dto.paidAmount - change);
        this.paymentMethod = dto.paymentMethod;
        this.change = change;
        this.paidAmount = dto.paidAmount;
    }
}
