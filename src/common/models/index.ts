import * as SequelizeStatic from 'sequelize';

import database from '../database';

import { user, UserModel } from './user';
import { permission, PermissionModel } from './permission';
import { act, ActModel } from './act';
import { event, EventModel } from './event';
import { contact, ContactModel } from './contact';
import { contactDetail, ContactDetailModel } from './contact-detail';
import { timeslot, TimeslotModel } from './timeslot';
import { booking, BookingModel } from './booking';
import { bookingStatus, BookingStatusModel } from './booking-status';
import { actContact, ActContactModel } from './act-contact';
import { location, LocationModel } from './location';
import { actApplication, ActApplicationModel } from './act-application';

/**
 * User 1:m Permission
 * Contact 1:m ActContact 1:1 Act
 * Act 1:1 ActContact (mainContact)
 * Booking 1:1 BookingStatus
 * Booking m:1 Act
 * Booking m:1 Event
 * Location m:1 Event
 * Timeslot m:1 Location
 * Timeslot 1:m Act
 * Act m:1 ActApplication
 */

export class Models {
    User: UserModel;
    Permission: PermissionModel;
    Act: ActModel;
    Event: EventModel;
    Contact: ContactModel;
    ContactDetail: ContactDetailModel;
    Timeslot: TimeslotModel;
    Booking: BookingModel;
    BookingStatus: BookingStatusModel;
    ActContact: ActContactModel;
    Location: LocationModel;
    ActApplication: ActApplicationModel;

    constructor() {
    }

    init() {
        this.Permission = permission(database.db);
        this.User = user(database.db, this.Permission);

        this.ActContact = actContact(database.db);
        this.ContactDetail = contactDetail(database.db);
        this.Contact = contact(database.db, this.ActContact, this.ContactDetail);
        this.BookingStatus = bookingStatus(database.db);
        this.ActApplication = actApplication(database.db);
        this.Booking = booking(database.db, this.BookingStatus, this.ActApplication);
        this.Act = act(database.db, this.Booking, this.Contact, this.ActContact);
        this.Location = location(database.db);
        this.Event = event(database.db, this.Booking, this.Location, this.ActApplication);
        this.Timeslot = timeslot(database.db, this.Act, this.Location);
    }
}

let models = new Models();
export default models;