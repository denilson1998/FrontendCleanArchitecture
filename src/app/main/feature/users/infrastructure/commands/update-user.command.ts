import { UpdateUserDto } from "../../domain/dtos/update-user.dto";
import { Role } from "../../domain/enums/roles";

export class UpdateUserCommand {
    role: Role;
    firstName: string;
    firstLastName: string;
    secondLastName: string;
    phoneNumber: string;

    constructor(dto: UpdateUserDto) {
        this.role = dto.role;
        this.firstName = dto.firstName;
        this.firstLastName = dto.firstLastName;
        this.secondLastName = dto.secondLastName;
        this.phoneNumber = dto.phoneNumber;
    }
}
