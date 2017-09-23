"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
function act(db, Booking, Contact, ActContact) {
    let Act = db.define('Act', {
        name: SequelizeStatic.STRING(255),
        town: SequelizeStatic.STRING(255),
        bio: SequelizeStatic.TEXT,
        tech_specs: SequelizeStatic.TEXT,
        type: SequelizeStatic.STRING(255)
    }, {
        schema: 'eventplanner'
    });
    Booking.belongsTo(Act);
    Act.hasMany(Booking);
    Act.hasMany(ActContact);
    ActContact.belongsTo(Act);
    Act.belongsTo(Contact, { as: 'mainContact' });
    Act.belongsTo(Contact, { as: 'webContact' });
    return Act;
}
exports.act = act;
