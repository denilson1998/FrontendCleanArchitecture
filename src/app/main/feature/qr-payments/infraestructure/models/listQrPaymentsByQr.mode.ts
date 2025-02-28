import { QrDetailModel } from "./qrDetail.model";

export interface ListQrPaymentByQrModel {
    errors? : string | null;
    pageNumber : number;
    pageSize : number;
    result : Array<qrInfoModel>;
    totalPages : number;
    totalRecords : number;
}

export interface qrInfoModel {
    id? : number;
    organizationId? : number;
    qrDetail? : QrDetailModel;
}