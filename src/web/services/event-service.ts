import database from '../../common/database';
import { ListDto } from '../../common/types';
import * as _ from 'lodash';
import * as SequelizeStatic from 'sequelize';

import { EventDto, EventInstance, EventAttribute } from '../../common/models/event';

export class EventService {
    async list(query?: ListDto) {
        console.log('list', query);

        if(!query) {
            query = {
                field: 'createdAt',
                order: 'DESC',
                filter: '',
                offset: 0,
                limit: 100
            }
        }

        if(query.order != 'ASC' && query.order != 'DESC') {
            query.order = 'ASC';
        }

        let order;
        if(query.field) {
            order = [ query.field, query.order ]
        }

        let options: SequelizeStatic.FindOptions = {
            order: order,
            offset: query.offset,
            limit: query.limit            
        }

        if(query.filter) {
            options.where = {
                name: {
                    $iLike: `%${query.filter}%`
                }
            }
        }

        console.log('do-list', options);

        let result = await database.models.Event.findAndCountAll(options);

        return {
            events: result.rows,
            count: result.count          
        };
    }

    async get(actId: number) {
        let event = await database.models.Event.findById(actId, {
        
        });

        return event;
    }

    async save(actApplicationData: EventDto) {        
        let event = await database.models.Event.findById(actApplicationData.id);
        
        if(!event) {
            event = await database.models.Event.create(actApplicationData);
        }

        return event;
    }

    async delete(actApplicationId: number) {
        let event = await database.models.Event.findById(actApplicationId);
        return await event.destroy();
    }
}

export default new EventService();