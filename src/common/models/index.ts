import * as SequelizeStatic from 'sequelize';

import database from '../database';

import { user, UserModel } from './user';

export class Models {
    User: UserModel;

    constructor() {
    }

    init() {
        this.User = user(database.db);
    }
}

let models = new Models();
export default models;