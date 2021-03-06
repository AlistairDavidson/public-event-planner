import database from '../../common/database';
import * as _ from 'lodash';
import * as SequelizeStatic from 'sequelize';
import { ActDto, ActsDto, ActInstance, ActModel } from '../../common/models/act';
import { ActContactDto } from '../../common/models/act-contact';
import { BookingDto, BookingInstance, BookingAttribute } from '../../common/models/booking';
import { ActApplicationDto, ActApplicationInstance, ActApplicationAttribute } from '../../common/models/act-application';
import { ListDto } from '../../common/types';

import searchService from './search-service';
import contactService from './contact-service';

export class ActService {
    async list(query?: ListDto) {    
        return await searchService.list<ActInstance>({
            model: database.models.Act,
            query: query,
            include: [{
                model: database.models.Contact,
                as: 'mainContact'           
            },{
                model: database.models.Contact,
                as: 'webContact'         
            }]
        });
    }

    async get(actId: number, full: boolean) {
        if(full) {
            return await database.models.Act
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
                        include: [{
                            model: database.models.Location,
                            include: [{ model: database.models.Event }]
                        }]
                    },{
                        model: database.models.Contact,
                        as: 'mainContact'
                    },{
                        model: database.models.Contact,
                        as: 'webContact'
                    }]
                });
        } else {
             return await database.models.Act.findById(actId);
        }
    }

    async save(actData: ActDto) {        
        let act;
        
        if(actData.id) {
            act = await database.models.Act.findById(actData.id);
        }
        
        if(!act) {
            act = await database.models.Act.create(actData);
        }
    
        let mainContactData = actData.mainContact;
        delete actData.mainContact;

        let webContactData = actData.webContact;
        delete actData.webContact;
       

        if(mainContactData) {
            let mainContact = await contactService.save(mainContactData);
            await act.setMainContact(mainContact);
        }

        if(webContactData) {
            let webContact = await contactService.save(webContactData);
            await act.setWebContact(webContact);
        }
        
        await this.rewriteContacts(act, actData.ActContacts);
        await this.rewriteBookings(act, actData.Bookings);
        
        // TODO: application updates here?

        return await this.get(act.id, true);
    }

    async rewriteContacts(act: ActInstance, actContactsData: ActContactDto[]) {
        let actContacts = await act.getActContacts()

        actContacts = actContacts || [];
        actContactsData = actContactsData || [];

        for(let actContact of actContacts) {
            let actContactData = _.find(actContactsData, acd => acd.id == actContact.id);

            if(!actContactData) {
                await actContact.destroy();
            } else if(actContactData.relationship != actContact.relationship || actContactData.ContactId != actContact.ContactId) {
                actContact = await actContact.update(actContactData);
            }
        }

        let actContactsToCreate = _.filter(actContactsData, actContactData => !actContactData.id);
        let newActContacts = await database.models.ActContact.bulkCreate(actContactsToCreate);

        /*

        let actContactIds = actContacts.map(actContact => actContact.id);
        let newActContactIds = actContactsData.map(actContactData => actContactData.id);        
    
        let actContactIdsToAdd = _.difference(newActContactIds, actContactIds);
    /*    let actContactIdsToRemove = _.difference(actContactIds, newActContactIds);        

        
        console.log('actContactIds', actContactIds, ' newActContactIds', newActContactIds, ' actContactIdsToAdd', actContactIdsToAdd, ' actContactIdsToRemove', actContactIdsToRemove);

        if(actContactIdsToRemove.length) {
            await act.removeActContacts(actContactIdsToRemove);
        }

        if(actContactIdsToAdd.length) {
            await act.addActContacts(actContactIdsToAdd);
        }

        */
    }

    async rewriteBookings(act: ActInstance, bookingsData: BookingDto[]) {
        let bookings = await act.getBookings()
        
        bookings = bookings || [];
        bookingsData = bookingsData || [];

        for(let booking of bookings) {
            let bookingData = _.find(bookingsData, bd => bd.id == booking.id);

            if(!bookingData) {
                await booking.destroy();
            } else {
                booking = await booking.update(bookingData);
            }
        }

        let bookingsToCreate = _.filter(bookingsData, bd => !bd.id);
        let newBookings = await database.models.Booking.bulkCreate(bookingsToCreate);
    }

    async delete(actId: number) {
        let act = await database.models.Act.findById(actId);
        return await act.destroy();
    }
}

export default new ActService();