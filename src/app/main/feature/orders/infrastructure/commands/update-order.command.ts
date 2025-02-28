import { UpdateOrderDto } from "../../domain/dtos/update-order.dto";

export class UpdateOrderCommand {
    id: number;
    customerId?: number;
    description?: string;
    isDelivered: boolean;
    constructor(dto: UpdateOrderDto) {
        this.id = dto.id;
        this.isDelivered = dto.isDelivered;
        this.customerId = dto.customerId;
        this.description = dto.description;
    }
}
