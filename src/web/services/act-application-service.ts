import database from '../../common/database';
import { ListDto } from '../../common/types';
import * as _ from 'lodash';
import * as SequelizeStatic from 'sequelize';

import { ActApplicationDto, ActApplicationInstance, ActApplicationAttribute, RawApplicationDto, ActApplicationsDto } from '../../common/models/act-application';

import contactService from './contact-service';
import searchService from './search-service';

export class ActApplicationService {
    async list(query: ListDto) {
        let options: any = {
            model: database.models.ActApplication,        
            offset: query.offset,
            limit: query.limit            
        }

        if(query.field) {
            if(query.order != 'DESC') {
                query.order = 'ASC';
            }

            options.order = SequelizeStatic.json(`details.${query.field} ${query.order}`) as string;
        }

        if(query.filter) {
            options.where = SequelizeStatic.and(
                SequelizeStatic.where(                
                    SequelizeStatic.cast(SequelizeStatic.col('details'), 'text'),
                    {
                        $iLike: `%${query.filter}%`
                    }
                ), {
                    EventId: query.eventId
                }) as any;
        } else {
            options.where = {
                EventId: query.eventId
            };
        }      

        return await searchService.list<ActApplicationInstance>(options);
    }

    async get(actId: number, full: boolean) {
        if(full) {
            return await database.models.ActApplication.findById(actId, {            
                include: [{
                    model: database.models.Booking,
                    include: [{
                        model: database.models.Act
                    }]                
                }]
            });
        } else {
            return await database.models.ActApplication.findById(actId);
        }    
    }

    async save(actApplicationData: ActApplicationDto) {     
        let application;
        
        if(actApplicationData.id) {
            application = await database.models.ActApplication.findById(actApplicationData.id);
        }

        if(!application) {
            application = await database.models.ActApplication.create(actApplicationData);
        } else { 
            application = await application.update(actApplicationData);
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