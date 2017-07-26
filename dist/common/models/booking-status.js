"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
function bookingStatus(db) {
    let BookingStatus = db.define('BookingStatus', {
        name: SequelizeStatic.STRING(255),
        order: SequelizeStatic.INTEGER,
        colour: SequelizeStatic.STRING(36),
        icon: SequelizeStatic.STRING(255)
    }, {
        schema: 'eventplanner'
    });
    BookingStatus.findOrCreate({
        where: {
            name: 'Applied',
            order: 0
        }
    });
    BookingStatus.findOrCreate({
        where: {
            name: 'Target',
            order: 1
        }
    });
    BookingStatus.findOrCreate({
        where: {
            name: 'Contacted',
            order: 2
        }
    });
    BookingStatus.findOrCreate({
        where: {
            name: 'Negotiating',
            order: 3
        }
    });
    BookingStatus.findOrCreate({
        where: {
            name: 'Booked',
            order: 4
        }
    });
    BookingStatus.findOrCreate({
        where: {
            name: 'Scheduled',
            order: 5
        }
    });
    BookingStatus.findOrCreate({
        where: {
            name: 'Complete',
            order: 6
        }
    });
    BookingStatus.findOrCreate({
        where: {
            name: 'Declined',
            order: 7
        }
    });
    return BookingStatus;
}
exports.bookingStatus = bookingStatus;
