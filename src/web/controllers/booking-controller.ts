import * as express from 'express';
import { Auth, GET, POST } from '../services/web-decorators';
import { ListDto } from '../../common/types';
import { BookingDto } from '../../common/models/booking';
import bookingService from '../services/booking-service';

export default class ApplicationController {
    constructor(app: express.Application) {
       
    }

    @GET('/api/booking/list')
    @Auth(['view_booking'])
    async list(req: express.Request, res: express.Response) {
        let query = req.query as ListDto;
        
        let result = await bookingService.list(query);

        return {
            rows: result.rows.map(row => row.toJSON()),
            count: result.count
        };
    }


    @GET('/api/booking/status/list')
    @Auth(['view_booking'])
    async listBookingStatuses(req: express.Request, res: express.Response) {
        let query = req.query as ListDto;
        
        let result = await bookingService.listBookingStatuses();

        return result.map(row => row.toJSON());            
    }
    
    @GET('/api/booking/get')
    @Auth(['view_booking'])
    async get(req: express.Request, res: express.Response) {
        let id = req.query.id as number;
        let full = !!req.query.full;

        let booking = await bookingService.get(id, full);
        return booking.toJSON();
    }
    
    @POST('/api/booking/save')
    @Auth(['edit_booking'])
    async save(req: express.Request, res: express.Response) {
        let bookingData = req.body as BookingDto;
        let booking = await bookingService.save(bookingData);
        return booking.toJSON();
    }
        
    @POST('/api/booking/delete')
    @Auth(['edit_booking'])
    async delete(req: express.Request, res: express.Response) {
        let id = req.body.id as number;
        let booking = await bookingService.delete(id);
        return { message: 'success' };
    }
}