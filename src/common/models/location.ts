import * as SequelizeStatic from 'sequelize';
import { EventModel, EventAttribute, EventInstance, EventDto } from './event';
import { ActModel, ActAttribute, ActInstance } from './act';
import { TimeslotInstance, TimeslotModel, TimeslotDto } from './timeslot';

export function location(db: SequelizeStatic.Sequelize)  {    
    let Location = db.define<LocationInstance, LocationAttribute>('Location', {
        name: SequelizeStatic.STRING            
    }, {
        schema: 'eventplanner'
    });

    return Location;
}

export interface LocationAttribute {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;

    name?: string;

    EventId?: number;
}

export interface LocationInstance extends SequelizeStatic.Instance<LocationAttribute>, LocationAttribute {
    event: EventInstance;
    createEvent: SequelizeStatic.BelongsToCreateAssociationMixin<EventAttribute>;
    getEvent: SequelizeStatic.BelongsToGetAssociationMixin<EventInstance>;
    setEvent: SequelizeStatic.BelongsToSetAssociationMixin<EventInstance, number>;

    getTimeslots: SequelizeStatic.HasManyGetAssociationsMixin<TimeslotInstance>;
    setTimeslots: SequelizeStatic.HasManySetAssociationsMixin<TimeslotInstance, number>;
    addTimeslots: SequelizeStatic.HasManyAddAssociationsMixin<TimeslotInstance, number>;
    addTimeslot: SequelizeStatic.HasManyAddAssociationMixin<TimeslotInstance, number>;
    createTimeslot: SequelizeStatic.HasManyCreateAssociationMixin<TimeslotInstance>;
    removeTimeslot: SequelizeStatic.HasManyRemoveAssociationMixin<TimeslotInstance, number>;
    removeTimeslots: SequelizeStatic.HasManyRemoveAssociationsMixin<TimeslotInstance, number>;
    hasTimeslot: SequelizeStatic.HasManyHasAssociationMixin<TimeslotInstance, number>;
    hasTimeslots: SequelizeStatic.HasManyHasAssociationsMixin<TimeslotInstance, number>;
    countTimeslots: SequelizeStatic.HasManyCountAssociationsMixin;
}

export interface LocationDto extends LocationAttribute {
    createdAt?: string;
    updatedAt?: string;

    event?: EventDto;
    Timeslots?: TimeslotDto[];
}

export interface LocationsDto {
    count: number;
    rows: LocationDto[];
}

export interface LocationModel extends SequelizeStatic.Model<LocationInstance, LocationAttribute> {}