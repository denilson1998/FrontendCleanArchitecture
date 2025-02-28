export class PagedResponse<T> {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    result: Array<T>;
    constructor(
        pageNumber: number,
        pageSize: number,
        totalPages: number,
        totalRecords: number,
        result: Array<T>
    ) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.totalRecords = totalRecords;
        this.result = result;
    }
}

export class PagedResponseModel<T> {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    result: Array<T>;
    constructor(
        pageNumber: number,
        pageSize: number,
        totalPages: number,
        totalRecords: number,
        result: Array<T>
    ) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.totalRecords = totalRecords;
        this.result = result;
    }
}