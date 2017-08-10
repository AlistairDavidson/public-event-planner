import * as SequelizeStatic from 'sequelize';
import { EventModel, EventAttribute, EventInstance, EventDto } from './event';
import { ActModel, ActAttribute, ActInstance, ActDto } from './act';
import { BookingStatusModel, BookingStatusAttribute, BookingStatusInstance, BookingStatusDto } from './booking-status';
import { ActApplicationModel, ActApplicationInstance, ActApplicationAttribute, ActApplicationDto } from './act-application';

export function booking(db: SequelizeStatic.Sequelize, BookingStatus: BookingStatusModel, ActApplication: ActApplicationModel)  {    
   let Booking = db.define<BookingInstance, BookingAttribute>('Booking', {
        tech_specs: SequelizeStatic.TEXT,
        size_of_act: SequelizeStatic.INTEGER,
        size_of_party: SequelizeStatic.INTEGER
        // budget
        // advertising priority
    }, {
        schema: 'eventplanner'
    });
    
    Booking.belongsTo(BookingStatus);

    Booking.hasOne(ActApplication);
    ActApplication.belongsTo(Booking);

    // todos

    // sequence of fee records from negotiation
    
    return Booking;    
}

export interface BookingAttribute { 
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    
    tech_specs?: string;
    size_of_act?: number;
    size_of_party?: number;
}

export interface BookingInstance extends SequelizeStatic.Instance<BookingAttribute>, BookingAttribute {    
    event: EventInstance;
    createEvent: SequelizeStatic.BelongsToCreateAssociationMixin<EventAttribute>;
    getEvent: SequelizeStatic.BelongsToGetAssociationMixin<EventInstance>;
    setEvent: SequelizeStatic.BelongsToSetAssociationMixin<EventInstance, number>;

    act: ActInstance;
    createAct: SequelizeStatic.BelongsToCreateAssociationMixin<ActAttribute>;
    getAct: SequelizeStatic.BelongsToGetAssociationMixin<ActInstance>;
    setAct: SequelizeStatic.BelongsToSetAssociationMixin<ActInstance, number>;

    bookingStatus: BookingStatusInstance;
    createBookingStatus: SequelizeStatic.BelongsToCreateAssociationMixin<BookingStatusAttribute>;
    getBookingStatus: SequelizeStatic.BelongsToGetAssociationMixin<BookingStatusInstance>;
    setBookingStatus: SequelizeStatic.BelongsToSetAssociationMixin<BookingStatusInstance, number>;

    actApplication: ActApplicationInstance;
    createActApplication: SequelizeStatic.BelongsToCreateAssociationMixin<ActApplicationAttribute>;
    getActApplication: SequelizeStatic.BelongsToGetAssociationMixin<ActApplicationInstance>;
    setActApplication: SequelizeStatic.BelongsToSetAssociationMixin<ActApplicationInstance, number>;
}

export interface BookingDto extends BookingAttribute {
    event?: EventDto;
    act?: ActDto;
    bookingStatus?: BookingStatusDto;
    actApplication?: ActApplicationDto; 
}

export interface BookingModel extends SequelizeStatic.Model<BookingInstance, BookingAttribute> {}