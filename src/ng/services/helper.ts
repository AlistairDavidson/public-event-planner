import { ListDto, MdSortDto } from '../../common/types';

export function queryToRequest(query: MdSortDto) {
    let field = query.order;
    let order = 'ASC';

    if(field && field[0] == '-') {
        field = field.slice(1);
        order = 'DESC';
    }

    let offset = (query.page - 1) * query.limit;

    let requestQuery: ListDto = {
        field: field,
        order: order,
        offset: offset,
        limit: query.limit,
        filter: query.filter,
        eventId: query.eventId
    };

    return requestQuery;
}