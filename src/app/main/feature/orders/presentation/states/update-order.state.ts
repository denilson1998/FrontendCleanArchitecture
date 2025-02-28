import { UpdateOrderDto } from "../../domain/dtos/update-order.dto";
import { OrderBaseEntity } from "../../domain/entities/order.entity";

export class UpdateSalesOrderState  {
    private orderId: number;
    private customerId: number;
    private description?: string;
    private isDelivered: boolean;
    // private paymentMethods?: OrderPaymentMethods;
    private _orderHasChanged = false;
    get orderHasChanged()  {return this._orderHasChanged};

    constructor(order: OrderBaseEntity) {
        this.orderId = order.id;
        this.customerId = order.customer.id;
        this.isDelivered = order.isDelivered;
        this.description = order.description;
    }

    setCustomerId(customerId: number) {
        this._orderHasChanged = true;
        this.customerId = customerId;
    }

    setDescription(description: string) {
        this._orderHasChanged = true;
        this.description = description;
    }

    setIsDelivered(isDelivered: boolean) {
        this._orderHasChanged = true;
        this.isDelivered = isDelivered;
    }

    getUpdateOrderDto() {
        return new UpdateOrderDto(
            this.orderId,
            this.isDelivered,
            this.customerId,
            this.description,
        )
    }
}
