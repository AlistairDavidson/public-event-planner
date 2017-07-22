import * as SequelizeStatic from 'sequelize';

import database from '../database';

import { user, UserModel } from './user';
import { permission, PermissionModel } from './permission';

export class Models {
    User: UserModel;
    Permission: PermissionModel;

    constructor() {
    }

    init() {
        this.Permission = permission(database.db);
        this.User = user(database.db, this.Permission);
    } // test
}

let models = new Models();
export default models;