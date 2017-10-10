"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../common/database");
const _ = require("lodash");
const search_service_1 = require("./search-service");
const contact_service_1 = require("./contact-service");
class ActService {
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield search_service_1.default.list({
                model: database_1.default.models.Act,
                query: query,
                include: [{
                        model: database_1.default.models.Contact,
                        as: 'mainContact'
                    }, {
                        model: database_1.default.models.Contact,
                        as: 'webContact'
                    }]
            });
        });
    }
    get(actId, full) {
        return __awaiter(this, void 0, void 0, function* () {
            if (full) {
                return yield database_1.default.models.Act
                    .findById(actId, {
                    include: [{
                            model: database_1.default.models.ActContact,
                            include: [{ model: database_1.default.models.Contact }]
                        }, {
                            model: database_1.default.models.Booking,
                            include: [{ model: database_1.default.models.Event },
                                { model: database_1.default.models.BookingStatus }],
                        }, {
                            model: database_1.default.models.Timeslot,
                            include: [{
                                    model: database_1.default.models.Location,
                                    include: [{ model: database_1.default.models.Event }]
                                }]
                        }, {
                            model: database_1.default.models.Contact,
                            as: 'mainContact'
                        }, {
                            model: database_1.default.models.Contact,
                            as: 'webContact'
                        }]
                });
            }
            else {
                return yield database_1.default.models.Act.findById(actId);
            }
        });
    }
    save(actData) {
        return __awaiter(this, void 0, void 0, function* () {
            let act;
            if (actData.id) {
                act = yield database_1.default.models.Act.findById(actData.id);
            }
            if (!act) {
                act = yield database_1.default.models.Act.create(actData);
            }
            let mainContactData = actData.mainContact;
            delete actData.mainContact;
            let webContactData = actData.webContact;
            delete actData.webContact;
            if (mainContactData) {
                let mainContact = yield contact_service_1.default.save(mainContactData);
                yield act.setMainContact(mainContact);
            }
            if (webContactData) {
                let webContact = yield contact_service_1.default.save(webContactData);
                yield act.setWebContact(webContact);
            }
            yield this.rewriteContacts(act, actData.ActContacts);
            //    await this.rewriteBookings(act, actData.bookings);
            return yield this.get(act.id, true);
        });
    }
    rewriteContacts(act, actContactsData) {
        return __awaiter(this, void 0, void 0, function* () {
            let actContacts = yield act.getActContacts();
            actContacts = actContacts || [];
            actContactsData = actContactsData || [];
            for (let actContact of actContacts) {
                let actContactData = _.find(actContactsData, acd => acd.id == actContact.id);
                if (!actContactData) {
                    yield actContact.destroy();
                }
                else if (actContactData.relationship != actContact.relationship || actContactData.ContactId != actContact.ContactId) {
                    actContact = yield actContact.update(actContactData);
                }
            }
            let actContactsToCreate = _.filter(actContactsData, actContactData => !actContactData.id);
            let newActContacts = yield database_1.default.models.ActContact.bulkCreate(actContactsToCreate);
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
        });
    }
    // Applications and bookings need proper create / updates
    rewriteBookings(act, bookingsData) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let bookingData of bookingsData) {
                let booking;
                if (bookingData.id) {
                    booking = (yield act
                        .getBookings({
                        where: { id: bookingData.id }
                    }))[0];
                }
                if (booking) {
                    booking = yield booking.update(bookingData);
                }
                else {
                    booking = yield database_1.default.models.Booking.create(bookingData);
                }
                let bookingStatus = yield database_1.default.models.BookingStatus
                    .findOne({
                    where: { name: bookingData.BookingStatus.name }
                });
                yield booking.setBookingStatus(bookingStatus);
            }
        });
    }
    delete(actId) {
        return __awaiter(this, void 0, void 0, function* () {
            let act = yield database_1.default.models.Act.findById(actId);
            return yield act.destroy();
        });
    }
}
exports.ActService = ActService;
exports.default = new ActService();
