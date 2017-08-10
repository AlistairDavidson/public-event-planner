import * as SequelizeStatic from 'sequelize';
import { BookingInstance, BookingAttribute, BookingModel, BookingDto } from './booking';
import { TimeslotInstance, TimeslotModel, TimeslotDto } from './timeslot';
import { ContactAttribute, ContactModel, ContactInstance, ContactDto } from './contact';
import { ActContactInstance, ActContactModel, ActContactDto } from './act-contact';

export function act(db: SequelizeStatic.Sequelize, Booking: BookingModel, Contact: ContactModel, ActContact: ActContactModel)  {    
    let Act = db.define<ActInstance, ActAttribute>('Act', {
        name: SequelizeStatic.STRING(255),
        town: SequelizeStatic.STRING(255),       
        bio: SequelizeStatic.TEXT,
        tech_specs: SequelizeStatic.TEXT,
        type: SequelizeStatic.STRING(255)
    }, {
        schema: 'eventplanner'
    });
    
    Booking.belongsTo(Act);
    Act.hasMany(Booking);

    Act.hasMany(ActContact);
    ActContact.belongsTo(Act);

    Act.belongsTo(Contact, { as: 'mainContact' });
    Act.belongsTo(Contact, { as: 'webContact' });

    return Act;
}

export interface ActAttribute {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;

    name?: string;
    bio?: string;
    tech_specs?: string;
    type?: string;

    mainContactId?: number;
    webContactId?: number;
}

export interface ActInstance extends SequelizeStatic.Instance<ActAttribute>, ActAttribute {
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

    getActContacts: SequelizeStatic.HasManyGetAssociationsMixin<ActContactInstance>;
    setActContacts: SequelizeStatic.HasManySetAssociationsMixin<ActContactInstance, number>;
    addActContacts: SequelizeStatic.HasManyAddAssociationsMixin<ActContactInstance, number>;
    addActContact: SequelizeStatic.HasManyAddAssociationMixin<ActContactInstance, number>;
    createActContact: SequelizeStatic.HasManyCreateAssociationMixin<ActContactInstance>;
    removeActContact: SequelizeStatic.HasManyRemoveAssociationMixin<ActContactInstance, number>;
    removeActContacts: SequelizeStatic.HasManyRemoveAssociationsMixin<ActContactInstance, number>;
    hasActContact: SequelizeStatic.HasManyHasAssociationMixin<ActContactInstance, number>;
    hasActContacts: SequelizeStatic.HasManyHasAssociationsMixin<ActContactInstance, number>;
    countActContacts: SequelizeStatic.HasManyCountAssociationsMixin;

    mainContact: ContactInstance;
    createMainContact: SequelizeStatic.BelongsToCreateAssociationMixin<ContactAttribute>;
    getMainContact: SequelizeStatic.BelongsToGetAssociationMixin<ContactInstance>;
    setMainContact: SequelizeStatic.BelongsToSetAssociationMixin<ContactInstance, number>;

    webContact: ContactInstance;
    createWebContact: SequelizeStatic.BelongsToCreateAssociationMixin<ContactAttribute>;
    getWebContact: SequelizeStatic.BelongsToGetAssociationMixin<ContactInstance>;
    setWebContact: SequelizeStatic.BelongsToSetAssociationMixin<ContactInstance, number>;
}

export interface ActDto extends ActAttribute {
    mainContact?: ContactDto;
    webContact?: ContactDto;
    actContacts?: ActContactDto[];
    timeslots?: TimeslotDto[];
    bookings?: BookingDto[];
}

export interface ActsDto {
    count: number;
    applications: ActDto[];
}

export interface ActModel extends SequelizeStatic.Model<ActInstance, ActAttribute> {}