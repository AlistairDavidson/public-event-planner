"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
function user(db, Permission) {
    let User = db.define('User', {
        username: SequelizeStatic.STRING(255),
        password: SequelizeStatic.STRING(255),
        uuid: SequelizeStatic.STRING(36)
    }, {
        schema: 'eventplanner'
    });
    Permission.belongsToMany(User, { through: 'UserPermission' });
    User.belongsToMany(Permission, { through: 'UserPermission' });
    return User;
}
exports.user = user;
