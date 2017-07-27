import database from '../../common/database';
import { ListDto } from '../../common/types';
import * as _ from 'lodash';
import * as SequelizeStatic from 'sequelize';

import { ActApplicationDto, ActApplicationInstance, ActApplicationAttribute, RawApplicationDto } from '../../common/models/act-application';

import contactService from './contact-service';

export class ActApplicationService {
    async list(query: ListDto) {
        if(query.order != 'ASC' && query.order != 'DESC') {
            throw 'Bad request';
        }

        let order = SequelizeStatic.json(`details.${query.field} ${query.order}`) as string;

        console.log({
            order: order,
            offset: query.offset,
            limit: query.limit
        });


        let result = await database.models.ActApplication.findAndCountAll({
            order: order,
            offset: query.offset,
            limit: query.limit
        });

        console.log(result);

        return {
            applications: result.rows,
            count: result.count          
        };
    }

    async get(actId: number) {
        let application = await database.models.ActApplication.findById(actId, {
            include: [{
                model: database.models.Booking,
                include: [{
                    model: database.models.Act
                }]
            }]
        });

        return application;
    }

    async save(actApplicationData: ActApplicationDto) {        
        let application = await database.models.ActApplication.findById(actApplicationData.id);
        
        if(!application) {
            application = await database.models.ActApplication.create(actApplicationData);
        }

        return application;
    }

    async delete(actApplicationId: number) {
        let application = await database.models.ActApplication.findById(actApplicationId);
        return await application.destroy();
    }

    /**
     * This can be called from an unauthed route
     */
    async createFromRaw(actApplicationData: RawApplicationDto) {        
        let application = await database.models.ActApplication.create({
            details: actApplicationData
        });

        return application;
    }
}

export default new ActApplicationService();