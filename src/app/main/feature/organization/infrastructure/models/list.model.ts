import { OrganizationModel } from "./organization.model";

export interface ListOrganizationModel {
    error : string;
    pageNumber : number;
    pageSize : number;
    result : Array<OrganizationModel>;
    totalPage : number;
    totalRecords : number;
}