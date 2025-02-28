export interface DataOptions {
    paginationOptions: {
        pageSize: number,
        pageNumber: number
    },
    sortOptions: SortOptions[],
    FilterOptions: FilterParameters[]
}

export interface SortOptions {
    field: string,
    direction: SortOrder
}

export class FilterParameters {
    
    Field: string;
    Value: any;
    Operation?: Filter;
    Concatenator?: string;
    Children?: Array<FilterParameters>;

    constructor(options : {field: string, value: any, operation?: Filter, concatenator?: Concatenator, children?: Array<FilterParameters>}){
        this.Field = options.field;
        this.Value = options.value;
        this.Operation = options.operation;
        this.Concatenator = options.concatenator;
        this.Children = options.children;
    }
}

export enum SortOrder
{
    Ascending = 0,
    Descending = 1
}

export enum Filter
{
    Equal = 0,
    NotEqual = 1,
    Contains = 2,
    LessThan = 3,
    GreaterThan = 4,
    LessThanOrEqual = 5,
    GreaterThanOrEqual = 6
}

export enum Concatenator
{
    And = "AND",
    Or = "OR",
}

export enum Operation
{
    Equal = "Equal",
    NotEqual = "NotEqual",
    Contains = "Contains",
    LessThan = "LessThan",
    GreaterThan = "GreaterThan",
    LessThanOrEqual = "LessThanOrEqual",
    GreaterThanOrEqual = "GreaterThanOrEqual",
}

