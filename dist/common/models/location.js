"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
function location(db) {
    let Location = db.define('Location', {
        start: SequelizeStatic.DATE,
        end: SequelizeStatic.DATE
    }, {
        schema: 'eventplanner'
    });
    return Location;
}
exports.location = location;
