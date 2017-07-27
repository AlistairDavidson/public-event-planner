import * as express from 'express';
import { Auth, GET, POST } from '../services/web-decorators';
import { ListDto } from '../../common/types';
import { ActApplicationDto, RawApplicationDto } from '../../common/models/act-application';
import actApplicationService from '../services/act-application-service';

export default class ApplicationController {
    constructor(app: express.Application) {
       
    }

    @GET('/api/application/list')
    @Auth(['view_applications'])
    async list(req: express.Request, res: express.Response) {
        let query = req.body as ListDto;
        
        let result = await actApplicationService.list(query);
        
        result.applications.map(application => application.toJSON());

        return result;
    }
    
    @GET('/api/application/get')
    @Auth(['view_applications'])
    async get(req: express.Request, res: express.Response) {
        let id = req.query.id as number;
        let application = await actApplicationService.get(id);
        return application.toJSON();
    }
    
    @POST('/api/application/save')
    @Auth(['edit_applications'])
    async save(req: express.Request, res: express.Response) {
        let id = req.body as ActApplicationDto;
        let application = await actApplicationService.save(id);
        return application.toJSON();
    }
        
    @POST('/api/application/delete')
    @Auth(['edit_applications'])
    async delete(req: express.Request, res: express.Response) {
        let id = req.query.id as number;
        let application = await actApplicationService.delete(id);
        return { message: 'success' };
    }

    /*******
     * NOTE: UNAUTHED
     */
    @POST('/api/application/apply')  
    async apply(req: express.Request, res: express.Response) {
        let data = req.body as RawApplicationDto;
        let application = await actApplicationService.save({
            details: data 
        });
        return { message: 'success' };
    }

}