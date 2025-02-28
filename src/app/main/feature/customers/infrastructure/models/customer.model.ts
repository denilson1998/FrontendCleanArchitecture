import { CreateCustomerDto } from "../../domain/dtos/create-customer.dto";
import { UpdateCustomerDto } from "../../domain/dtos/update-customer.dto";
import { CustomerEntity, CustomerFromListEntity } from "../../domain/entities/customer.entity";

export class CustomerFromListModel {
    id: number;
    fullName: string;
    phoneNumber?: string;
    email?: string;
    location?: string;

    constructor(json: any) {
        this.id = json.id;
        this.fullName = json.fullName;
        this.phoneNumber = json.phoneNumber;
        this.email = json.email;
        this.location = json.location;
    }

    public toEntity(): CustomerFromListEntity {
        return new CustomerFromListEntity(
            this.id,
            this.fullName,
            this.phoneNumber,
            this.email,
            this.location,
        )
    }
}

export class CustomerModel {
    id : number
    fullName : string;
    phoneNumber?: string;
    email?: string;
    location?: string;

    constructor(json: any) {
        this.id = json.id;
        this.fullName = json.fullName;
        this.phoneNumber = json.phoneNumber;
        this.email = json.email;
        this.location = json.location;
    }

    public toEntity(): CustomerEntity {
        return new CustomerEntity(
            this.id,
            this.fullName,
            this.phoneNumber,
            this.email,
            this.location,
        )
    }
}

export class CreateCustomerModel {
    fullName: string;
    phoneNumber?: string;
    email?: string;
    location?: string;

    constructor(dto: CreateCustomerDto) {
        this.fullName = dto.fullName;
        this.phoneNumber = dto.phoneNumber;
        this.email = dto.email;
        this.location = dto.location;
    }
}

export class UpdateCustomerModel {
    id: number
    fullName: string;
    phoneNumber?: string;
    email?: string;
    location?: string;

    constructor(dto: UpdateCustomerDto) {
        this.id = dto.id,
        this.fullName = dto.fullName;
        this.phoneNumber = dto.phoneNumber;
        this.email = dto.email;
        this.location = dto.location;
    }
}
