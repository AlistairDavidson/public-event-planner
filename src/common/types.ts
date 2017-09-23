export interface ListDto {
    field: string;
    order: string;
    offset: number;
    limit: number;
    filter: string;

    eventId?: number;
    actId?: number;
}

export interface MdSortDto {
    order?: string;
    limit?: number;
    page?: number;
    filter?: string;
    
    eventId?: number;
    actId?: number;
}