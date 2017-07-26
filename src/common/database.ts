import * as SequelizeStatic from 'sequelize';
import { Models } from './models';
import models from './models';

export class Database {
    db: SequelizeStatic.Sequelize;
    models: Models;

    constructor() {
        this.models = models;
    }

    connect() {
        this.db = new SequelizeStatic(
            process.env.DATABASE_URL, {
                native: true
            }
        );
        try {
            return this.db
                .authenticate()
                .then(function(err) {
                    console.log('Database connection has been established successfully.');
                }, function (err) { 
                    console.log('Unable to connect to the database:', err);
                })
                .then(() => models.init())            
                .then(() => this.db.sync())
                .then(() => {

                    this.models.BookingStatus.findOrCreate({
                        where: {
                            name: 'Applied',
                            order: 0
                        }
                    });

                    this.models.BookingStatus.findOrCreate({
                        where: {
                            name: 'Target',
                            order: 1
                        }
                    });

                    this.models.BookingStatus.findOrCreate({
                        where: {
                            name: 'Contacted',
                            order: 2
                        }
                    });

                    this.models.BookingStatus.findOrCreate({
                        where: {
                            name: 'Negotiating',
                            order: 3
                        }
                    });

                    this.models.BookingStatus.findOrCreate({
                        where: {
                            name: 'Booked',
                            order: 4
                        }
                    });

                    this.models.BookingStatus.findOrCreate({
                        where: {
                            name: 'Scheduled',
                            order: 5
                        }
                    });

                    this.models.BookingStatus.findOrCreate({
                        where: {
                            name: 'Complete',
                            order: 6
                        }
                    });

                    this.models.BookingStatus.findOrCreate({
                        where: {
                            name: 'Declined',
                            order: 7
                        }
                    });
                });
        } catch(e) {
            console.error(e);
        }
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