"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
function contact(db, ActContact) {
    let Contact = db.define('Contact', {
        name: SequelizeStatic.STRING(255),
        details: SequelizeStatic.JSON
    }, {
        schema: 'eventplanner'
    });
    Contact.hasMany(ActContact);
    ActContact.belongsTo(Contact);
    return Contact;
}
exports.contact = contact;
