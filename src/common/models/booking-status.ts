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

    BookingStatus.findOrCreate({
        where: {
            name: 'Applied',
            order: 0
        }
    });

    BookingStatus.findOrCreate({
        where: {
            name: 'Target',
            order: 1
        }
    });

    BookingStatus.findOrCreate({
        where: {
            name: 'Contacted',
            order: 2
        }
    });

    BookingStatus.findOrCreate({
        where: {
            name: 'Negotiating',
            order: 3
        }
    });

    BookingStatus.findOrCreate({
        where: {
            name: 'Booked',
            order: 4
        }
    });

    BookingStatus.findOrCreate({
        where: {
            name: 'Scheduled',
            order: 5
        }
    });

    BookingStatus.findOrCreate({
        where: {
            name: 'Complete',
            order: 6
        }
    });

    BookingStatus.findOrCreate({
        where: {
            name: 'Declined',
            order: 7
        }
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