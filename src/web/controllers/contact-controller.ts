import * as express from 'express';
import { Auth, GET, POST } from '../services/web-decorators';
import { ListDto } from '../../common/types';
import { ContactDto } from '../../common/models/contact';
import contactService from '../services/contact-service';

export default class ApplicationController {
    constructor(app: express.Application) {
       
    }

    @GET('/api/contact/list')
    @Auth(['view_contact'])
    async list(req: express.Request, res: express.Response) {
        let query = req.query as ListDto;
        
        let result = await contactService.list(query);

        return {
            rows: result.rows.map(row => row.toJSON()),
            count: result.count
        };
    }
    
    @GET('/api/contact/get')
    @Auth(['view_contact'])
    async get(req: express.Request, res: express.Response) {
        let id = req.query.id as number;
        let full = !!req.query.full;

        let contact = await contactService.get(id, full);
        return contact.toJSON();
    }
    
    @POST('/api/contact/save')
    @Auth(['edit_contact'])
    async save(req: express.Request, res: express.Response) {
        let contactData = req.body as ContactDto;
        let contact = await contactService.save(contactData);
        return contact.toJSON();
    }
        
    @POST('/api/contact/delete')
    @Auth(['edit_contact'])
    async delete(req: express.Request, res: express.Response) {
        let id = req.body.id as number;
        let contact = await contactService.delete(id);
        return { message: 'success' };
    }
}