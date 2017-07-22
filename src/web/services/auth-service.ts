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
        return bcrypt.compareSync(password, user.get('password'));
    }  

   /* async authorize(authorization: string, role: string, requirements: string[]) {     
        console.log('Hit authorize');

        let permissions = await this.permissions(authorization);

        // check if permissions contains one of requirements
        let hasPermission = !!_(permissions.permissions_by_role_id[role])
            .uniq()
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

    async permissions(authorization: string) {
        var options = {
            uri: `${process.env.MEMBER_API_URL}/auth/permissions`,
            headers: {
                'Authorization': authorization
            }
        };

        let response = await request(options);
                    
        return JSON.parse(response).permissions;
    }*/
}

export default new AuthService();