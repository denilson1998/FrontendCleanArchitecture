export class UpdateCustomerDto {
    id: number
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
        this.id = id,
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.location = location;
    }
}
