import { BehaviorSubject, shareReplay } from "rxjs";
import { PaymentMethod } from "src/app/shared/domain/enums/paymenetMethod";
import { CustomerBaseEntity } from "../../../customers/domain/entities/customer.entity";
import { ProductEntity } from "../../../products/domain/entities/product.entity";
import { CreateOrderDto, CreateOrderItemDto, CreateOrderPaymentDto } from "../../domain/dtos/create-order.dto";
import { roundToTwoDecimals } from "src/app/shared/domain/utils/numbers.utils";

export class CreateSalesOrderState  {
    protected _cart = new BehaviorSubject<Cart>(new Cart());
    cart$ = this._cart.asObservable().pipe(shareReplay(1));
    public customer?: CustomerBaseEntity;
    get cart(): Cart {
        return this._cart.getValue();
    }
    public paymentMethods = new OrderPaymentMethods();

    get change(): number {
        let change = this.paymentMethods.total - this.cart.totalPrice;
        return roundToTwoDecimals(change > 0 ? change : 0);
    }

    get missingTotal(): number {
        let missingTotal = this.cart.totalPrice - this.paymentMethods.total;
        return roundToTwoDecimals(missingTotal > 0 ? missingTotal : 0);
    }
    canGenerateQr = false;
    isDelivered = false;
    description = '';

    setCustomer(customer: CustomerBaseEntity) {
        this.customer = customer;
    }

    upsertCartItem(cartItem: CartItem) {
        let cartItemFound = this.cart.items.find(item => item.product.id === cartItem.product.id);
        if (cartItemFound) {
            cartItemFound.quantity = cartItem.quantity;
            cartItemFound.unitPrice = roundToTwoDecimals(cartItem.unitPrice);
        } else {
            this.cart.items.push(cartItem);
        }
        this._cart.next(this.cart);
    }

    removeCartItem(cartItem: CartItem) {
        this.cart.items = this.cart.items.filter(item => item.product.id !== cartItem.product.id);
        this._cart.next(this.cart);
    }

    getCreateOrderDto() {
        let createOrderPaymentsDtos: Array<CreateOrderPaymentDto> = [
            new CreateOrderPaymentDto(this.paymentMethods.cash, PaymentMethod.Cash),
            new CreateOrderPaymentDto(this.paymentMethods.card, PaymentMethod.Card),
            new CreateOrderPaymentDto(this.paymentMethods.qr, PaymentMethod.QR),
            new CreateOrderPaymentDto(this.paymentMethods.transference, PaymentMethod.Transfer),
        ];

        return new CreateOrderDto(
            this.customer?.id ?? 0,
            this.description,
            this.cart.totalPrice,
            this.paymentMethods.total === this.cart.totalPrice,
            this.isDelivered,
            this.cart.items.map(item => new CreateOrderItemDto(item.product.id, item.quantity, item.unitPrice)),
            createOrderPaymentsDtos
        );
    }

    reset() {
        this._cart.next(new Cart());
        this.paymentMethods = new OrderPaymentMethods();
        this.customer = undefined;
        this.isDelivered = false;
        this.description = '';
    }
}



export class CartItem {
    product: ProductEntity;
    quantity: number;
    unitPrice: number;

    get totalPrice (): number {
        return roundToTwoDecimals(this.quantity * this.unitPrice);
    };
    constructor(product: ProductEntity, quantity: number, unitPrice: number) {
        this.product = product;
        this.quantity = quantity;
        this.unitPrice = roundToTwoDecimals(unitPrice);
    }
}

export class Cart {
    items: Array<CartItem> = [];
    get totalPrice (): number {
        return roundToTwoDecimals(this.items.reduce((total, item) => total + item.totalPrice, 0));
    };
}

export class OrderPaymentMethods {
    cash: number = 0;
    card: number = 0;
    qr: number = 0;
    transference: number = 0;

    get total(): number {
        if (typeof(this.cash) === 'string') {
            return roundToTwoDecimals(parseFloat(this.cash) + parseFloat(this.card.toString()) + parseFloat(this.qr.toString()) + parseFloat(this.transference.toString()));

        }
        return roundToTwoDecimals(this.cash + this.card + this.qr + this.transference);
    }
}
