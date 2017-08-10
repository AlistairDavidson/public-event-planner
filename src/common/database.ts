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
            await this.db.sync();
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
        
        
        await this.models.Permission.findOrCreate({
            where: {
                name: 'view_profile'
            }
        });

        await this.models.Permission.findOrCreate({
            where: {
                name: 'view_application'
            }
        });

        await this.models.Permission.findOrCreate({
            where: {
                name: 'edit_application'
            }
        });

        await this.models.Permission.findOrCreate({
            where: {
                name: 'edit_event'
            }
        });


        await this.models.Permission.findOrCreate({
            where: {
                name: 'view_event'
            }
        });


        /****
            TEST
        ******/

        await this.models.ActApplication.findOrCreate({
            where: {
                details: {
                    name: 'Allstars',
                    type: 'Band',
                    contact_name: 'Alice',
                    email: 'band@example.com',
                    phone: '000-000-000-000',
                    town: 'Aberdeen',
                    link: 'http://example.com',
                    facebook: 'http://example.com',
                    twitter: 'http://example.com',
                    size_of_act: 4,
                    size_of_party: 4,
                    party_names: 'Alice, Alex, Annabel, Ally',
                    requested_fee: '£100',    
                    bio: 'All about alabaster',
                    image: 'https://www.ticketline.co.uk/images/artist/the-wurzels/the-wurzels.jpg',
                    tech_specs: 'Amps'   
                }
            }
        });

         await this.models.ActApplication.findOrCreate({
            where: {
                details: {
                    name: 'Braves',
                    type: 'Band',
                    contact_name: 'Bob',
                    email: 'band@example.com',
                    phone: '000-000-000-000',
                    town: 'Brigton',
                    link: 'http://example.com',
                    facebook: 'http://example.com',
                    twitter: 'http://example.com',
                    size_of_act: 2,
                    size_of_party: 2,
                    party_names: 'Bob, Belle',
                    requested_fee: '£200',    
                    bio: 'Brilliant',
                    image: 'http://cdn8.openculture.com/wp-content/uploads/2015/01/06212116/spinal-tap.jpg',
                    tech_specs: 'Bass'   
                }
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