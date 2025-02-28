import { CreateUserDto } from "../../domain/dtos/create-user.dto";
import { Role } from "../../domain/enums/roles";

export class CreateUserCommand {
    role: Role;
    email: string;

    constructor(dto: CreateUserDto) {
        this.role = dto.role;
        this.email = dto.email;
    }
}
