import { ProductEntity } from "./product.entity";

export interface ListProductEntity {
    error : string;
    pageNumber : number;
    pageSize : number;
    result : Array<ProductEntity>;
    totalPages : number;
    totalRecords : number;
}