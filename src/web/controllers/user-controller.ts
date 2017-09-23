import * as express from 'express';
import { Auth, GET, POST } from '../services/web-decorators';
import { ListDto } from '../../common/types';
import { UserDto } from '../../common/models/user';
import userService from '../services/user-service';

export default class ApplicationController {
    constructor(app: express.Application) {
       
    }

    @GET('/api/user/list')
    @Auth(['view_user'])
    async list(req: express.Request, res: express.Response) {
        let query = req.query as ListDto;
        
        let result = await userService.list(query);

        return {
            rows: result.rows.map(row => row.toJSON()),
            count: result.count
        };
    }
    
    @GET('/api/user/get')
    @Auth(['view_user'])
    async get(req: express.Request, res: express.Response) {
        let id = req.query.id as number;
        let full = !!req.query.full;

        let user = await userService.get(id, full);
        return user.toJSON();
    }
    
    @POST('/api/user/save')
    @Auth(['edit_user'])
    async save(req: express.Request, res: express.Response) {
        let userData = req.body as UserDto;
        let user = await userService.save(userData);
        return user.toJSON();
    }
        
    @POST('/api/user/delete')
    @Auth(['edit_user'])
    async delete(req: express.Request, res: express.Response) {
        let id = req.body.id as number;
        let user = await userService.delete(id);
        return { message: 'success' };
    }
}