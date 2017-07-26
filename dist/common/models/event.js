"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
function event(db, Booking, Location, ActApplication) {
    let Event = db.define('Event', {
        name: SequelizeStatic.STRING(255),
        version: SequelizeStatic.STRING(255),
        start: SequelizeStatic.DATE,
        end: SequelizeStatic.DATE
    }, {
        schema: 'eventplanner'
    });
    Event.hasMany(Booking);
    Booking.belongsTo(Event);
    Location.belongsTo(Event);
    Event.hasMany(Location);
    ActApplication.belongsTo(Event);
    Event.hasMany(ActApplication);
    // TODOs
    return Event;
}
exports.event = event;
