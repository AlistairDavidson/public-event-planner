"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
function act(db, Booking, Contact, ActContact) {
    let Act = db.define('Act', {
        name: SequelizeStatic.STRING(255),
        bio: SequelizeStatic.TEXT,
        size: SequelizeStatic.NUMBER,
        tech_specs: SequelizeStatic.TEXT
    }, {
        schema: 'eventplanner'
    });
    Booking.belongsTo(Act);
    Act.hasMany(Booking);
    Act.hasMany(ActContact);
    ActContact.belongsTo(Act);
    Act.belongsTo(Contact, { as: 'mainContact' });
    return Act;
}
exports.act = act;
