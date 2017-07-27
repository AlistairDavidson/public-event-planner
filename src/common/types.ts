export interface ListDto {
    field: string;
    order: string;
    offset: number;
    limit: number;
}

export interface MdSortDto {
    order: string;
    limit: number;
    page: number;
}