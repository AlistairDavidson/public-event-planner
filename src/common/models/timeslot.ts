import * as SequelizeStatic from 'sequelize';
import { EventModel, EventAttribute, EventInstance } from './event';
import { ActModel, ActAttribute, ActInstance } from './act';
import { LocationAttribute, LocationModel, LocationInstance } from './location';

export function timeslot(db: SequelizeStatic.Sequelize, Act: ActModel, Location: LocationModel)  {    
    let Timeslot = db.define<TimeslotInstance, TimeslotAttribute>('Timeslot', {
        start: SequelizeStatic.DATE,
        end: SequelizeStatic.DATE                
    }, {
        schema: 'eventplanner'
    });

    Timeslot.belongsTo(Act);    
    Act.hasMany(Timeslot);

    Timeslot.belongsTo(Location);
    Location.hasMany(Timeslot); 

    return Timeslot;
}

export interface TimeslotAttribute {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    start?: Date,
    end?: Date
}

export interface TimeslotInstance extends SequelizeStatic.Instance<TimeslotAttribute>, TimeslotAttribute {    
    act: ActInstance;
    createAct: SequelizeStatic.BelongsToCreateAssociationMixin<ActAttribute>;
    getAct: SequelizeStatic.BelongsToGetAssociationMixin<ActInstance>;
    setAct: SequelizeStatic.BelongsToSetAssociationMixin<ActInstance, number>;

    location: LocationInstance;
    createLocation: SequelizeStatic.BelongsToCreateAssociationMixin<LocationAttribute>;
    getLocation: SequelizeStatic.BelongsToGetAssociationMixin<LocationInstance>;
    setLocation: SequelizeStatic.BelongsToSetAssociationMixin<LocationInstance, number>;
}

export interface TimeslotDto extends TimeslotAttribute {    
}

export interface TimeslotModel extends SequelizeStatic.Model<TimeslotInstance, TimeslotAttribute> {}