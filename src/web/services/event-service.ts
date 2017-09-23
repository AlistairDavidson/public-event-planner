import database from '../../common/database';
import { ListDto } from '../../common/types';
import * as _ from 'lodash';
import * as SequelizeStatic from 'sequelize';

import { EventDto, EventInstance, EventAttribute } from '../../common/models/event';
import searchService from './search-service';

export class EventService {
    async list(query?: ListDto) {
        return await searchService.list<EventInstance>({
            model: database.models.Event,
            query: query
        });
    }

    async get(eventId: number, full: boolean) {
        if(full) {
            return await database.models.Event.findById(eventId, {
                include: [{
                    model: database.models.Booking,
                    include: [{ model: database.models.BookingStatus }]
                }, {
                    model: database.models.Location,
                    include: [{ model: database.models.Timeslot }]
                }, {
                    model: database.models.ActApplication
                }]
            });
        } else {
            return await database.models.Event.findById(eventId);
        }
    }

    async save(eventData: EventDto) {        
        let event;
        
        if(eventData.id) {
            event = await database.models.Event.findById(eventData.id);
        }
        
        if(!event) {
            event = await database.models.Event.create(eventData);
        } else {
            event = await event.update(eventData);
        }

        return event;
    }

    async delete(eventId: number) {
        let event = await database.models.Event.findById(eventId);
        return await event.destroy();
    }
}

export default new EventService();