import { OrganizationRole } from "src/app/main/feature/organization/domain/entities/organizationRole.entity"
import { Role } from "../../../users/domain/enums/roles";
import { UserDataRow } from "../../../users/domain/entities/data-row-entities/users.data-row";
export interface UserEntity {
    auhtOid : string,
    id: number,
    email: string,
    firstName: string,
    firstLastName: string,
    secondLastName: string,
    phoneNumber: string,
    emailVerified: boolean,
    currentOrganizationId?: number
    organizationRoles: OrganizationRole[]
    role: string
}

export class UserBaseEntity {
    id: number;
    role: Role;
    email: string;
    firstName: string;
    firstLastName: string;
    secondLastName: string;
    phoneNumber: string;
    createdAt: Date;
    auth0Id: string;

    constructor(
        id: number,
        role: Role,
        email: string,
        firstName: string,
        firstLastName: string,
        secondLastName: string,
        phoneNumber: string,
        createdAt: Date,
        auth0Id: string,
    ) {
        this.id = id,
        this.role = role;
        this.email = email,
        this.firstName = firstName,
        this.firstLastName = firstLastName,
        this.secondLastName = secondLastName,
        this.phoneNumber = phoneNumber,
        this.createdAt = createdAt,
        this.auth0Id = auth0Id
    }
    get fullName() {
        return `${this.firstName ?? ''} ${this.firstLastName ?? ''} ${this.secondLastName ?? ''}`;
    }
    
    convertToDataRow(): UserDataRow {
        return new UserDataRow(
            this.id,
            `${this.firstName ?? ''} ${this.firstLastName ?? ''} ${this.secondLastName ?? ''}`,
            this.role,
            this.email,
        )
    }
}

export class UserEntity2 extends UserBaseEntity {
    constructor(
        id: number,
        role: Role,
        email: string,
        firstName: string,
        firstLastName: string,
        secondLastName: string,
        phoneNumber: string,
        createdAt: Date,
        auth0Id: string,
    ) {
        super(
            id,
            role,
            email,
            firstName,
            firstLastName,
            secondLastName,
            phoneNumber,
            createdAt,
            auth0Id,
        )
    }
}

export class UserFromListEntity extends UserBaseEntity {
    constructor(
        id: number,
        role: Role,
        email: string,
        firstName: string,
        firstLastName: string,
        secondLastName: string,
        phoneNumber: string,
        createdAt: Date,
        auth0Id: string,
    ) {
        super(
            id,
            role,
            email,
            firstName,
            firstLastName,
            secondLastName,
            phoneNumber,
            createdAt,
            auth0Id,
        )
    }
}
