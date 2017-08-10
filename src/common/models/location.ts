import * as SequelizeStatic from 'sequelize';
import { EventModel, EventAttribute, EventInstance, EventDto } from './event';
import { ActModel, ActAttribute, ActInstance } from './act';
import { TimeslotInstance, TimeslotModel, TimeslotDto } from './timeslot';

export function location(db: SequelizeStatic.Sequelize)  {    
    let Location = db.define<LocationInstance, LocationAttribute>('Location', {
        start: SequelizeStatic.DATE,
        end: SequelizeStatic.DATE                
    }, {
        schema: 'eventplanner'
    });

    return Location;
}

export interface LocationAttribute {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;

    start?: Date,
    end?: Date

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
    event?: EventDto;
    timeslots?: TimeslotDto[];
}

export interface LocationModel extends SequelizeStatic.Model<LocationInstance, LocationAttribute> {}