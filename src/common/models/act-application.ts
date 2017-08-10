import * as SequelizeStatic from 'sequelize';
import { BookingInstance, BookingAttribute, BookingModel, BookingDto } from './booking';
import { EventInstance, EventAttribute, EventModel, EventDto } from './event';

export function actApplication(db: SequelizeStatic.Sequelize)  {    
    let ActApplication = db.define<ActApplicationInstance, ActApplicationAttribute>('ActApplication', {
        details: SequelizeStatic.JSON
    }, {
        schema: 'eventplanner'
    });
    
    return ActApplication;    
}

export interface ActApplicationAttribute {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    details?: RawApplicationDto;
    BookingId?: number;
    EventId?: number;
}

export interface RawApplicationDto {
    name?: string;
    type?: string;
    contact_name?: string;
    email?: string;
    phone?: string;
    town?: string;
    link?: string;
    facebook?: string;
    twitter?: string;
    size_of_act?: number;
    size_of_party?: number;
    party_names?: string;
    requested_fee?: string;    
    bio?: string;
    image?: string;
    tech_specs?: string;
}

export interface ActApplicationDto extends ActApplicationAttribute {
    createdAt?: string;
    updatedAt?: string;
    booking?: BookingDto;
    event?: EventDto;
}

export interface ActApplicationsDto {
    count: number;
    applications: ActApplicationDto[];
}

export interface ActApplicationInstance extends SequelizeStatic.Instance<ActApplicationAttribute>, ActApplicationAttribute {
    booking: BookingInstance;
    createBooking: SequelizeStatic.BelongsToCreateAssociationMixin<BookingAttribute>;
    getBooking: SequelizeStatic.BelongsToGetAssociationMixin<BookingInstance>;
    setBooking: SequelizeStatic.BelongsToSetAssociationMixin<BookingInstance, number>;

    event: EventInstance;
    createEvent: SequelizeStatic.BelongsToCreateAssociationMixin<EventAttribute>;
    getEvent: SequelizeStatic.BelongsToGetAssociationMixin<EventInstance>;
    setEvent: SequelizeStatic.BelongsToSetAssociationMixin<EventInstance, number>;
}

export interface ActApplicationModel extends SequelizeStatic.Model<ActApplicationInstance, ActApplicationAttribute> {}