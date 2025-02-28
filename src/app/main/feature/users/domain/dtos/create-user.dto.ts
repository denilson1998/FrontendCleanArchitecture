import { Role } from "../enums/roles";

export class CreateUserDto {
    role: Role;
    email: string;
    firstName?: string;
    firstLastName?: string;
    secondLastName?: string;
    phoneNumber?: string;

    constructor(
        role: Role,
        email: string,
        firstName?: string,
        firstLastName?: string,
        secondLastName?: string,
        phoneNumber?: string,
    ) {
        this.role = role;
        this.email = email;
        this.firstName = firstName;
        this.firstLastName = firstLastName;
        this.secondLastName = secondLastName;
        this.phoneNumber = phoneNumber;
    }
}
