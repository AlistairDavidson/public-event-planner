import * as express from 'express';
import { Auth, GET, POST } from '../services/web-decorators';
import { ListDto } from '../../common/types';
import { ActDto } from '../../common/models/act';
import actService from '../services/act-service';

export default class ApplicationController {
    constructor(app: express.Application) {
       
    }

    @GET('/api/act/list')
    @Auth(['view_act'])
    async list(req: express.Request, res: express.Response) {
        let query = req.query as ListDto;
        
        let result = await actService.list(query);

        return {
            rows: result.rows.map(row => row.toJSON()),
            count: result.count
        };
    }
    
    @GET('/api/act/get')
    @Auth(['view_act'])
    async get(req: express.Request, res: express.Response) {
        let id = req.query.id as number;
        let full = !!req.query.full;

        let act = await actService.get(id, full);
        return act.toJSON();
    }
    
    @POST('/api/act/save')
    @Auth(['edit_act'])
    async save(req: express.Request, res: express.Response) {
        let actData = req.body as ActDto;
        let act = await actService.save(actData);
        return act.toJSON();
    }
        
    @POST('/api/act/delete')
    @Auth(['edit_act'])
    async delete(req: express.Request, res: express.Response) {
        let id = req.body.id as number;
        let act = await actService.delete(id);
        return { message: 'success' };
    }
}