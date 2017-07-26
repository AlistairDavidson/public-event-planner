import * as SequelizeStatic from 'sequelize';

export function bookingStatus(db: SequelizeStatic.Sequelize)  {    
    let BookingStatus = db.define<BookingStatusInstance, BookingStatusAttribute>('BookingStatus', {
        name: SequelizeStatic.STRING(255),
        order: SequelizeStatic.INTEGER,
        colour: SequelizeStatic.STRING(36),
        icon: SequelizeStatic.STRING(255)
    }, {
        schema: 'eventplanner'
    });

    return BookingStatus;    
}

export interface BookingStatusAttribute {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    name?: string;
    order?: number;
    colour?: string;
    icon?: string;
}

export interface BookingStatusDto extends BookingStatusAttribute {
}

export interface BookingStatusInstance extends SequelizeStatic.Instance<BookingStatusAttribute>, BookingStatusAttribute {    
}

export interface BookingStatusModel extends SequelizeStatic.Model<BookingStatusInstance, BookingStatusAttribute> {}