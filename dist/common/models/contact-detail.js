"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
function contactDetail(db) {
    let ContactDetail = db.define('ContactDetail', {
        data: SequelizeStatic.JSON,
        type: SequelizeStatic.STRING(255)
    }, {
        schema: 'eventplanner'
    });
    return ContactDetail;
}
exports.contactDetail = contactDetail;
