import database from '../../common/database';
import * as _ from 'lodash';

import { ActDto, ActInstance } from '../../common/models/act';
import { ActContactDto } from '../../common/models/act-contact';
import { BookingDto, BookingInstance, BookingAttribute } from '../../common/models/booking';
import { ActApplicationDto, ActApplicationInstance, ActApplicationAttribute } from '../../common/models/act-application';

import contactService from './contact-service';

export class ActService {
    async list() {
        let acts = await database.models.Act.findAll();
        return acts;
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
                }]
            });

        return act;
    }

    async updateOrCreate(actData: ActDto) {        
        let mainContactData = actData.mainContact;
        delete actData.mainContact;

        let act = await this.get(actData.id);
        if(!act) {
            act = await database.models.Act.create(actData);
        }

        let mainContact = (await contactService.updateOrCreate([ mainContactData ]))[0];
        await act.setMainContact(mainContact);

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