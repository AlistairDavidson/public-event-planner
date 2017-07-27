export interface ListDto {
    field: string;
    order: string;
    offset: number;
    limit: number;
    filter: string;
}

export interface MdSortDto {
    order: string;
    limit: number;
    page: number;
    filter: string;
}