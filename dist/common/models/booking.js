"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
function booking(db, BookingStatus, ActApplication) {
    let Booking = db.define('Booking', {
        tech_specs: SequelizeStatic.TEXT,
        size_of_act: SequelizeStatic.INTEGER,
        size_of_party: SequelizeStatic.INTEGER
        // budget
        // advertising priority
    }, {
        schema: 'eventplanner'
    });
    Booking.belongsTo(BookingStatus);
    Booking.hasOne(ActApplication);
    ActApplication.belongsTo(Booking);
    // todos
    // sequence of fee records from negotiation
    return Booking;
}
exports.booking = booking;
