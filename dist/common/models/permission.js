"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
function permission(db) {
    let Permission = db.define('Permission', {
        name: SequelizeStatic.STRING(255)
    }, {
        schema: 'eventplanner'
    });
    return Permission;
}
exports.permission = permission;
