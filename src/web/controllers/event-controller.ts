import * as express from 'express';
import { Auth, GET, POST } from '../services/web-decorators';
import { ListDto } from '../../common/types';
import { EventDto } from '../../common/models/event';
import eventService from '../services/event-service';

export default class EventController {
    constructor(app: express.Application) {
       
    }

    @GET('/api/event/list')
    @Auth(['view_event'])
    async list(req: express.Request, res: express.Response) {
        let query = req.query as ListDto;
        
        let result = await eventService.list(query);

        return {
            rows: result.rows.map(event => event.toJSON()),
            count: result.count
        };
    }
    
    @GET('/api/event/get')
    @Auth(['view_event'])
    async get(req: express.Request, res: express.Response) {
        let id = req.query.id as number;
        let full = !!req.query.full;

        let event = await eventService.get(id, full);
        return event.toJSON();
    }
    
    @POST('/api/event/save')
    @Auth(['edit_event'])
    async save(req: express.Request, res: express.Response) {
        let id = req.body as EventDto;

        let event = await eventService.save(id);
        return event.toJSON();
    }
        
    @POST('/api/event/delete')
    @Auth(['edit_event'])
    async delete(req: express.Request, res: express.Response) {
        let id = req.query.id as number;
        let event = await eventService.delete(id);
        return { message: 'success' };
    }
}