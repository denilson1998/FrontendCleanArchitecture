import { Role } from "../enums/roles";

export class UpdateUserDto {
    id: number;
    role: Role;
    firstName: string;
    firstLastName: string;
    secondLastName: string;
    phoneNumber: string;
    editRole: boolean;

    constructor(
        id: number,
        role: Role,
        firstName: string,
        firstLastName: string,
        secondLastName: string,
        phoneNumber: string,
        editRole: boolean
    ) {
        this.id = id,
        this.role = role;
        this.firstName = firstName;
        this.firstLastName = firstLastName;
        this.secondLastName = secondLastName;
        this.phoneNumber = phoneNumber;
        this.editRole = editRole;
    }
}
