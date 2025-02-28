import { CustomerDataRow } from "./data-row-entities/customers.data-row";

export abstract class CustomerBaseEntity {
    id: number;
    fullName: string;
    phoneNumber?: string;
    email?: string;
    location?: string;

    constructor(
        id: number,
        fullName: string,
        phoneNumber: string,
        email: string,
        location: string
    ) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.location = location;
    }
}

export class CustomerEntity implements CustomerBaseEntity {
    id: number;
    fullName: string;
    phoneNumber?: string;
    email?: string;
    location?: string;

    constructor(
        id: number,
        fullName: string,
        phoneNumber?: string,
        email?: string,
        location?: string
    ) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.location = location;
    }
}

export class CustomerFromListEntity implements CustomerBaseEntity {
    id: number;
    fullName: string;
    phoneNumber?: string;
    email?: string;
    location?: string;

    constructor(
        id: number,
        fullName: string,
        phoneNumber?: string,
        email?: string,
        location?: string
    ) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.location = location;
    }

    public convertToDataRow() {
        return new CustomerDataRow(
            this.id,
            this.fullName,
            this.phoneNumber,
            this.email,
            this.location,
        );
    }
}