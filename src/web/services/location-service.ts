import database from '../../common/database';
import { ListDto } from '../../common/types';
import * as _ from 'lodash';
import * as SequelizeStatic from 'sequelize';

import { LocationDto, LocationInstance, LocationAttribute } from '../../common/models/location';
import searchService from './search-service';

export class LocationService {
    async list(query?: ListDto) {        
        if(!query.eventId) {
            throw {
                status: 400,
                code: 'BAD_REQUEST',
                message: `No event id supplied`
            }
        }

        let where: SequelizeStatic.WhereOptions = {
            EventId: query.eventId
        } 

        if(query.filter) {
            where.name = {
                $iLike: `%${query.filter}%`
            }
        }

        return await searchService.list<LocationInstance>({
            model: database.models.Location,
            query: query,
            where: where
        });
    }

    async get(locationId: number, full: boolean) {
        if(full) {
            return await database.models.Location.findById(locationId, {
                include: [{
                    model: database.models.Event
                }]
            });
        } else {
            return await database.models.Location.findById(locationId);
        }
    }

    async save(locationData: LocationDto) {        
        let location;
        
        if(locationData.id) {
            location = await database.models.Location.findById(locationData.id);
        }
        
        if(!location) {
            location = await database.models.Location.create(locationData);
        } else {
            location = await location.update(locationData);
        }

        return location;
    }

    async delete(locationId: number) {
        let location = await database.models.Location.findById(locationId);
        return await location.destroy();
    }
}

export default new LocationService();