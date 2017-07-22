import * as bcrypt from 'bcrypt';

let request = require('request-promise');
import * as _ from 'lodash';
import * as express from 'express';
import database from '../../common/database';
import * as SequelizeStatic from 'sequelize';
import * as uuid from 'uuid';
import { UserInstance } from '../../common/models/user';

export class AuthService {
    generateHash(password: string) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }

    validPassword(user: UserInstance, password: string) {
        console.log('validating', user.get('username'), password);
        return bcrypt.compareSync(password, user.get('password'));
    }  

   async authorize(user: UserInstance, requirements: string[]) {     
        console.log('Hit authorize');

    
        let permissions = await this.permissions(user);

        // check if permissions contains one of requirements
        let hasPermission = !!_(permissions)            
            .intersection(requirements)
            .value()
            .length;

        if(!hasPermission) {
            throw {
                status: 'NOT_PERMITTED',
                code: 403,
                message: `User has none of the permissions ${requirements}`
            }
        }

        // if yes, return permissions
        return permissions;
    }

    async permissions(user: UserInstance) {
        let permissions = await user.getPermissions();
        return permissions.map(permission => permission.name);
    }
}

export default new AuthService();