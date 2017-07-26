"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
function timeslot(db, Act, Location) {
    let Timeslot = db.define('Timeslot', {
        start: SequelizeStatic.DATE,
        end: SequelizeStatic.DATE
    }, {
        schema: 'eventplanner'
    });
    Timeslot.belongsTo(Act);
    Act.hasMany(Timeslot);
    Timeslot.belongsTo(Location);
    Location.hasMany(Timeslot);
    return Timeslot;
}
exports.timeslot = timeslot;
