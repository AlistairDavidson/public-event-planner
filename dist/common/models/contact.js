"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
function contact(db, ActContact, ContactDetail) {
    let Contact = db.define('Contact', {
        name: SequelizeStatic.STRING(255)
    }, {
        schema: 'eventplanner'
    });
    Contact.hasMany(ActContact);
    ActContact.belongsTo(Contact);
    Contact.hasMany(ContactDetail);
    ContactDetail.belongsTo(Contact);
    return Contact;
}
exports.contact = contact;
