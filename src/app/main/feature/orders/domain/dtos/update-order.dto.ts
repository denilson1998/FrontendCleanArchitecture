export class UpdateOrderDto {
    id: number;
    customerId?: number;
    description?: string;
    isDelivered: boolean;
    constructor(
        id: number,
        isDelivered: boolean,
        customerId?: number,
        description?: string,
    ) {
        this.id = id;
        this.isDelivered = isDelivered;
        this.customerId = customerId;
        this.description = description;
    }
}
