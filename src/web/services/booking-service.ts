import database from '../../common/database';
import { ListDto } from '../../common/types';
import * as _ from 'lodash';
import * as SequelizeStatic from 'sequelize';

import { BookingDto, BookingInstance, BookingAttribute } from '../../common/models/booking';
import searchService from './search-service';

export class BookingService {
    async list(query?: ListDto) {
        let where;

        if(!query.eventId && !query.actId) {
            throw {
                status: 400,
                code: 'BAD_REQUEST',
                message: `No event or act id supplied`
            }
        }

        if(query.eventId) {
            where = {
                EventId: query.eventId
            }      
        }

        if(query.actId) {
            where = {
                ActId: query.actId
            }
        }

        return await searchService.list<BookingInstance>({
            model: database.models.Booking,
            query: query,
            where: where
        });
    }

    async listBookingStatuses() {
        return await database.models.BookingStatus.all();
    }

    async get(bookingId: number, full: boolean) {
        if(full) {
            return await database.models.Booking.findById(bookingId, {
                include: [{
                    model: database.models.BookingStatus
                }, {
                    model: database.models.Act
                }, {
                    model: database.models.ActApplication
                }]
            });
        } else {
            return await database.models.Booking.findById(bookingId);
        }
    }

    async save(bookingData: BookingDto) {        
        let booking;
        
        if(bookingData.id) {
            booking = await database.models.Booking.findById(bookingData.id);
        }
        
        if(!booking) {
            booking = await database.models.Booking.create(bookingData);
        } else {
            booking.update(bookingData);
        }

        return booking;
    }

    async delete(bookingId: number) {
        let booking = await database.models.Booking.findById(bookingId);
        return await booking.destroy();
    }
}

export default new BookingService();