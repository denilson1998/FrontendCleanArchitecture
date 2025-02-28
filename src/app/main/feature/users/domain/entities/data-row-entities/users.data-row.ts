import { Role } from "../../enums/roles";

export class UserDataRow {
    id: number;
    fullName: string;
    role: string;
    email: string;

    constructor(
      id: number,
      fullName: string,
      role: Role | string,
      email: string,
    ) {
      this.id = id;
      this.fullName = fullName;
      switch (role) {
        case 'Admin':
        case Role.Admin:
          this.role = 'Administrador'
          break;

        case 'Owner':
        case Role.Owner:
          this.role = 'Propietario'
          break;

        case 'Seller':
        case Role.Seller:
          this.role = 'Vendedor'
          break;

        default:
          console.log(role)
          throw new Error('Role not found');
      }
      this.email = email;
    }
}
