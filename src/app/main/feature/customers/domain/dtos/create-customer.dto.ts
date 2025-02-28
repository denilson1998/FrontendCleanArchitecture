
export class CreateCustomerDto {
    fullName: string;
    phoneNumber?: string;
    email?: string;
    location?: string;

    constructor(
        fullName: string,
        phoneNumber?: string,
        email?: string,
        location?: string
    ) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.location = location;
    }
}
