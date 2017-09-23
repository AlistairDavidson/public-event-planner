"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
function location(db) {
    let Location = db.define('Location', {
        name: SequelizeStatic.STRING
    }, {
        schema: 'eventplanner'
    });
    return Location;
}
exports.location = location;
