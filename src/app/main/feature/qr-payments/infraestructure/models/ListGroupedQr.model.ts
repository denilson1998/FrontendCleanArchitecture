import { GroupedQrDetailModel } from "./groupedQrDetail.model";

export interface ListGroupedQrDetailModel {
    errors? : string | null;
    pageNumber : number;
    pageSize : number;
    result : Array<GroupedQrDetailModel>;
    totalPages : number;
    totalRecords : number;
}