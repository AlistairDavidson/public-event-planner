import * as SequelizeStatic from 'sequelize';
import { BookingInstance, BookingModel, BookingDto } from './booking';
import { LocationInstance, LocationModel, LocationDto } from './location';
import { ActApplicationInstance, ActApplicationModel, ActApplicationDto } from './act-application';

export function event(db: SequelizeStatic.Sequelize, Booking: BookingModel, Location: LocationModel, ActApplication: ActApplicationModel)  {    
    let Event = db.define<EventInstance, EventAttribute>('Event', {
        name: SequelizeStatic.STRING(255),
        version: SequelizeStatic.STRING(255),
        start: SequelizeStatic.DATE,
        end: SequelizeStatic.DATE        
    }, {
        schema: 'eventplanner'
    });

    Event.hasMany(Booking);
    Booking.belongsTo(Event);

    Location.belongsTo(Event); 
    Event.hasMany(Location);

    ActApplication.belongsTo(Event);
    Event.hasMany(ActApplication);

    // TODOs

    return Event;    
}

export interface EventAttribute {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;

    name?: string;
    version?: string;
    start?: Date | string;
    end?: Date | string;
}

export interface EventInstance extends SequelizeStatic.Instance<EventAttribute>, EventAttribute {
    getBookings: SequelizeStatic.HasManyGetAssociationsMixin<BookingInstance>;
    setBookings: SequelizeStatic.HasManySetAssociationsMixin<BookingInstance, number>;
    addBookings: SequelizeStatic.HasManyAddAssociationsMixin<BookingInstance, number>;
    addBooking: SequelizeStatic.HasManyAddAssociationMixin<BookingInstance, number>;
    createBooking: SequelizeStatic.HasManyCreateAssociationMixin<BookingInstance>;
    removeBooking: SequelizeStatic.HasManyRemoveAssociationMixin<BookingInstance, number>;
    removeBookings: SequelizeStatic.HasManyRemoveAssociationsMixin<BookingInstance, number>;
    hasBooking: SequelizeStatic.HasManyHasAssociationMixin<BookingInstance, number>;
    hasBookings: SequelizeStatic.HasManyHasAssociationsMixin<BookingInstance, number>;
    countBookings: SequelizeStatic.HasManyCountAssociationsMixin;

    getLocations: SequelizeStatic.HasManyGetAssociationsMixin<LocationInstance>;
    setLocations: SequelizeStatic.HasManySetAssociationsMixin<LocationInstance, number>;
    addLocations: SequelizeStatic.HasManyAddAssociationsMixin<LocationInstance, number>;
    addLocation: SequelizeStatic.HasManyAddAssociationMixin<LocationInstance, number>;
    createLocation: SequelizeStatic.HasManyCreateAssociationMixin<LocationInstance>;
    removeLocation: SequelizeStatic.HasManyRemoveAssociationMixin<LocationInstance, number>;
    removeLocations: SequelizeStatic.HasManyRemoveAssociationsMixin<LocationInstance, number>;
    hasLocation: SequelizeStatic.HasManyHasAssociationMixin<LocationInstance, number>;
    hasLocations: SequelizeStatic.HasManyHasAssociationsMixin<LocationInstance, number>;
    countLocations: SequelizeStatic.HasManyCountAssociationsMixin;

    getActApplications: SequelizeStatic.HasManyGetAssociationsMixin<ActApplicationInstance>;
    setActApplications: SequelizeStatic.HasManySetAssociationsMixin<ActApplicationInstance, number>;
    addActApplications: SequelizeStatic.HasManyAddAssociationsMixin<ActApplicationInstance, number>;
    addActApplication: SequelizeStatic.HasManyAddAssociationMixin<ActApplicationInstance, number>;
    createActApplication: SequelizeStatic.HasManyCreateAssociationMixin<ActApplicationInstance>;
    removeActApplication: SequelizeStatic.HasManyRemoveAssociationMixin<ActApplicationInstance, number>;
    removeActApplications: SequelizeStatic.HasManyRemoveAssociationsMixin<ActApplicationInstance, number>;
    hasActApplication: SequelizeStatic.HasManyHasAssociationMixin<ActApplicationInstance, number>;
    hasActApplications: SequelizeStatic.HasManyHasAssociationsMixin<ActApplicationInstance, number>;
    countActApplications: SequelizeStatic.HasManyCountAssociationsMixin;
}

export interface EventDto extends EventAttribute {  
    createdAt?: string;
    updatedAt?: string;
    start?: string;
    end?: string;   

    bookings?: BookingDto[];
    locations?: LocationDto[];
    actApplications?: ActApplicationDto[];
}

export interface EventsDto {
    count: number;
    rows: EventDto[];
}

export interface EventModel extends SequelizeStatic.Model<EventInstance, EventAttribute> {}