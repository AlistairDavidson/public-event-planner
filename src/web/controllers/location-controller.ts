import * as express from 'express';
import { Auth, GET, POST } from '../services/web-decorators';
import { ListDto } from '../../common/types';
import { LocationDto } from '../../common/models/location';
import locationService from '../services/location-service';

export default class ApplicationController {
    constructor(app: express.Application) {
       
    }

    @GET('/api/location/list')
    @Auth(['view_location'])
    async list(req: express.Request, res: express.Response) {
        let query = req.query as ListDto;
        
        let result = await locationService.list(query);

        return {
            rows: result.rows.map(row => row.toJSON()),
            count: result.count
        };
    }
    
    @GET('/api/location/get')
    @Auth(['view_location'])
    async get(req: express.Request, res: express.Response) {
        let id = req.query.id as number;
        let full = !!req.query.full;

        let location = await locationService.get(id, full);
        return location.toJSON();
    }
    
    @POST('/api/location/save')
    @Auth(['edit_location'])
    async save(req: express.Request, res: express.Response) {
        let locationData = req.body as LocationDto;
        let location = await locationService.save(locationData);
        return location.toJSON();
    }
        
    @POST('/api/location/delete')
    @Auth(['edit_location'])
    async delete(req: express.Request, res: express.Response) {
        let id = req.body.id as number;
        let location = await locationService.delete(id);
        return { message: 'success' };
    }
}