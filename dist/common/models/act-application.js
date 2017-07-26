"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
function actApplication(db) {
    let ActApplication = db.define('ActApplication', {
        details: SequelizeStatic.JSON
    }, {
        schema: 'eventplanner'
    });
    return ActApplication;
}
exports.actApplication = actApplication;
