"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const user_1 = require("./user");
const permission_1 = require("./permission");
const act_1 = require("./act");
const event_1 = require("./event");
const contact_1 = require("./contact");
const timeslot_1 = require("./timeslot");
const booking_1 = require("./booking");
const booking_status_1 = require("./booking-status");
const act_contact_1 = require("./act-contact");
const location_1 = require("./location");
const act_application_1 = require("./act-application");
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
class Models {
    constructor() {
    }
    init() {
        this.Permission = permission_1.permission(database_1.default.db);
        this.User = user_1.user(database_1.default.db, this.Permission);
        this.ActContact = act_contact_1.actContact(database_1.default.db);
        this.Contact = contact_1.contact(database_1.default.db, this.ActContact);
        this.BookingStatus = booking_status_1.bookingStatus(database_1.default.db);
        this.ActApplication = act_application_1.actApplication(database_1.default.db);
        this.Booking = booking_1.booking(database_1.default.db, this.BookingStatus, this.ActApplication);
        this.Act = act_1.act(database_1.default.db, this.Booking, this.Contact, this.ActContact);
        this.Location = location_1.location(database_1.default.db);
        this.Event = event_1.event(database_1.default.db, this.Booking, this.Location, this.ActApplication);
        this.Timeslot = timeslot_1.timeslot(database_1.default.db, this.Act, this.Location);
    }
}
exports.Models = Models;
let models = new Models();
exports.default = models;
