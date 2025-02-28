import { UserEntity2, UserFromListEntity } from "../../../auth/domain/entities/user.entity";
import { Role } from "../../domain/enums/roles";

export class UserModel {
    id: number;
    auth0Id: string;
    email: string;
    firstName: string;
    firstLastName: string;
    secondLastName: string;
    phoneNumber: string;
    emailVerified: boolean;
    organizationRoles: UserOrganizationRoleModel[];
    createdAt: Date;

    constructor(json: any) {
        this.id = json.id;
        this.auth0Id = json.auth0Id;
        this.email = json.email;
        this.firstName = json.firstName;
        this.firstLastName = json.firstLastName;
        this.secondLastName = json.secondLastName;
        this.phoneNumber = json.phoneNumber;
        this.emailVerified = json.emailVerified;
        this.organizationRoles = json.organizationRoles;
        this.createdAt = new Date(json.createdAt);
    }

    public toEntity(organizationId: number): UserEntity2 {
        return new UserEntity2(
            this.id,
            this.organizationRoles.find(x => x.organizationId === organizationId)!.role,
            this.email,
            this.firstName,
            this.firstLastName,
            this.secondLastName,
            this.phoneNumber,
            this.createdAt,
            this.auth0Id

        )
    }
}

export interface UserOrganizationRoleModel {
    role: Role
    organizationId: number;
}

export class UserFromListModel {
    role: Role;
    client: ClientInfoFromListModel;

    constructor(json: any) {
        this.role = json.role;
        this.client = {
            id: json.client.id,
            email: json.client.email,
            firstName: json.client.firstName,
            firstLastName: json.client.firstLastName,
            secondLastName: json.client.secondLastName,
            phoneNumber: json.client.phoneNumber,
            createdAt: json.client.createdAt,
            auth0Id: json.client.auth0Id
        }
    }

    public toEntity(): UserFromListEntity {
        return new UserFromListEntity(
            this.client.id,
            this.role,
            this.client.email,
            this.client.firstName,
            this.client.firstLastName,
            this.client.secondLastName,
            this.client.phoneNumber,
            this.client.createdAt,
            this.client.auth0Id
        )
    }
}

export interface ClientInfoFromListModel {
    id: number;
    email: string;
    firstName: string;
    firstLastName: string;
    secondLastName: string;
    phoneNumber: string;
    createdAt: Date;
    auth0Id: string;
}
