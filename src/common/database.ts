import * as SequelizeStatic from 'sequelize';
import { Models } from './models';
import models from './models';

export class Database {
    db: SequelizeStatic.Sequelize;
    models: Models;

    constructor() {
        this.models = models;
    }

    async connect() {
        this.db = new SequelizeStatic(
            process.env.DATABASE_URL, {
                native: true
            }
        );

        try {
            await this.db.authenticate()
            await models.init();
            await this.db.sync({ force: true });
        } catch(err) {
            console.log('Unable to connect to the database:', err);
        }    
            
        await this.models.BookingStatus.findOrCreate({
            where: {
                name: 'Applied',
                order: 0
            }
        });

        await this.models.BookingStatus.findOrCreate({
            where: {
                name: 'Target',
                order: 1
            }
        });

        await this.models.BookingStatus.findOrCreate({
            where: {
                name: 'Contacted',
                order: 2
            }
        });

        await this.models.BookingStatus.findOrCreate({
            where: {
                name: 'Negotiating',
                order: 3
            }
        });

        await this.models.BookingStatus.findOrCreate({
            where: {
                name: 'Booked',
                order: 4
            }
        });

        await this.models.BookingStatus.findOrCreate({
            where: {
                name: 'Scheduled',
                order: 5
            }
        });

        await this.models.BookingStatus.findOrCreate({
            where: {
                name: 'Complete',
                order: 6
            }
        });

        await this.models.BookingStatus.findOrCreate({
            where: {
                name: 'Declined',
                order: 7
            }
        });         
    }

    create() {
        return this.db.sync({ force: true })
            .then(function(err) {           
                console.log('Database created!');
            }, function (err) { 
                console.log('An error occurred while creating the table:', err);
            });                  
    }
}

let database = new Database();
export default database;