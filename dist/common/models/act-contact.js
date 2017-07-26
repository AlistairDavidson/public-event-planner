"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
function actContact(db) {
    let ActContact = db.define('ActContact', {
        relationship: SequelizeStatic.STRING(255)
    }, {
        schema: 'eventplanner'
    });
    return ActContact;
}
exports.actContact = actContact;
