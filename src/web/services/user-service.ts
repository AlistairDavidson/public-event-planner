import database from '../../common/database';
import { ListDto } from '../../common/types';
import * as _ from 'lodash';
import * as SequelizeStatic from 'sequelize';

import { UserDto, UserInstance, UserAttribute } from '../../common/models/user';
import searchService from './search-service';

export class UserService {
    async list(query?: ListDto) {
        let options: any = {
            model: database.models.User,
            query: query,
            attributes: ['id', 'username', 'uuid']
        }

        if(query.filter) {
            options.where = {
                username: {
                    $iLike: `%${query.filter}%`
                }
            }
        }

        return await searchService.list<UserInstance>(options);
    }

    async get(userId: number, full: boolean) {
        if(full) {
            return await database.models.User.findById(userId, {
                attributes: ['id', 'username', 'uuid'],
                include: [{
                    model: database.models.Permission
                }]
            });
        } else { 
            return await database.models.User.findById(userId, {
                attributes: ['id', 'username', 'uuid']
            });
        }
    }

    async save(userData: UserDto) {        
        let user;
        
        if(userData.id) {
            user = await database.models.User.findById(userData.id);
        }
        
        if(!user) {
            user = await database.models.User.create(userData);
        } else {
            user = await user.update(userData);
        }

        return user;
    }

    async delete(userId: number) {
        let user = await database.models.User.findById(userId);
        return await user.destroy();
    }
}

export default new UserService();