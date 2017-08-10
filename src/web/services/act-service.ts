import database from '../../common/database';
import * as _ from 'lodash';
import * as SequelizeStatic from 'sequelize';

import { ActDto, ActsDto, ActInstance } from '../../common/models/act';
import { ActContactDto } from '../../common/models/act-contact';
import { BookingDto, BookingInstance, BookingAttribute } from '../../common/models/booking';
import { ActApplicationDto, ActApplicationInstance, ActApplicationAttribute } from '../../common/models/act-application';
import { ListDto } from '../../common/types';


import contactService from './contact-service';

export class ActService {
        async list(query?: ListDto): Promise<ActsDto> {
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

        options.include = [{
            model: database.models.Contact,
            as: 'mainContact'           
        },{
            model: database.models.Contact,
            as: 'webContact'         
        }];

        console.log('do-list', options);

        let result = await database.models.Act.findAndCountAll(options);

        return {
            acts: result.rows,
            count: result.count          
        };
    }

    async get(actId: number) {
        let act = await database.models.Act
            .findById(actId, {
                include: [{
                    model: database.models.ActContact,
                    include: [{ model: database.models.Contact }]
                },{
                    model: database.models.Booking,
                    include: [{ model: database.models.Event },
                             { model: database.models.BookingStatus }],
                },{
                    model: database.models.Timeslot,
                    include: [{ model: database.models.Location,
                                include: [{ model: database.models.Event }] }]
                },{
                    model: database.models.Contact,
                    as: 'mainContact'
                },{
                    model: database.models.Contact,
                    as: 'webContact'
                }]
            });

        return act;
    }

    async save(actData: ActDto) {        
        let act = await database.models.Act.findById(actData.id);
        
        if(!act) {
            act = await database.models.Act.create(actData);
        }

        return act;
    }

    async updateOrCreate(actData: ActDto) {        
        let mainContactData = actData.mainContact;
        delete actData.mainContact;

        let webContactData = actData.webContact;
        delete actData.webContact;


        let act = await this.get(actData.id);
        if(!act) {
            act = await database.models.Act.create(actData);
        }

        let mainContact = (await contactService.updateOrCreate([ mainContactData ]))[0];
        await act.setMainContact(mainContact);

        let webContact = (await contactService.updateOrCreate([ webContactData ]))[0];
        await act.setMainContact(webContact);

        await this.rewriteContacts(act, actData.actContacts);
        await this.rewriteBookings(act, actData.bookings);
      
        return await this.get(act.id);
    }

    async rewriteContacts(act: ActInstance, actContactsData: ActContactDto[]) {
        let actContacts = await act.getActContacts();
        let actContactIds = actContacts.map(actContact => actContact.id);
        let newActContactIds = actContactsData.map(actContactData => actContactData.id);

        let actContactIdsToAdd = _.difference(newActContactIds, actContactIds);
        let actContactIdsToRemove = _.difference(actContactIds, newActContactIds);

        await act.removeActContacts(actContactIdsToRemove);
        await act.addActContacts(actContactIdsToAdd);

        return this.get(act.id);
    }

    // Applications and bookings need proper create / updates
    async rewriteBookings(act: ActInstance, bookingsData: BookingDto[]) {
        for(let bookingData of bookingsData) {
            let booking: BookingInstance;

            if(bookingData.id) {
                booking = (await act
                    .getBookings({
                        where: { id: bookingData.id }
                    })
                )[0];
            }

            if(booking) {
                booking = await booking.update(bookingData);
            } else {
                booking = await database.models.Booking.create(bookingData);
            }

            let bookingStatus = await database.models.BookingStatus
                .findOne({ 
                    where: { name: bookingData.bookingStatus.name }
                });

            await booking.setBookingStatus(bookingStatus);
        }

        return await act.getBookings();
    }

    async delete(actId: number) {
        let act = await database.models.Act.findById(actId);
        return await act.destroy();
    }
}

export default new ActService();