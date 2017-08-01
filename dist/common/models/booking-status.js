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
    return BookingStatus;
}
exports.bookingStatus = bookingStatus;
