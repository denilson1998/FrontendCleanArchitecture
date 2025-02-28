import { QrPaymentEntity } from "./qr-payments.entity";




export interface ListQrPaymentEntity {
    errors : string;
    pageNumber : number;
    pageSize : number;
    result : Array<QrPaymentEntity>;
    totalPages : number;
    totalRecords : number;
}