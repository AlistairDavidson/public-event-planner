"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
const models_1 = require("./models");
class Database {
    constructor() {
        this.models = models_1.default;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = new SequelizeStatic(process.env.DATABASE_URL, {
                native: true
            });
            try {
                yield this.db.authenticate();
                yield models_1.default.init();
                yield this.db.sync();
            }
            catch (err) {
                console.log('Unable to connect to the database:', err);
            }
            yield this.models.BookingStatus.findOrCreate({
                where: {
                    name: 'Applied',
                    order: 0
                }
            });
            yield this.models.BookingStatus.findOrCreate({
                where: {
                    name: 'Target',
                    order: 1
                }
            });
            yield this.models.BookingStatus.findOrCreate({
                where: {
                    name: 'Contacted',
                    order: 2
                }
            });
            yield this.models.BookingStatus.findOrCreate({
                where: {
                    name: 'Negotiating',
                    order: 3
                }
            });
            yield this.models.BookingStatus.findOrCreate({
                where: {
                    name: 'Booked',
                    order: 4
                }
            });
            yield this.models.BookingStatus.findOrCreate({
                where: {
                    name: 'Scheduled',
                    order: 5
                }
            });
            yield this.models.BookingStatus.findOrCreate({
                where: {
                    name: 'Complete',
                    order: 6
                }
            });
            yield this.models.BookingStatus.findOrCreate({
                where: {
                    name: 'Declined',
                    order: 7
                }
            });
            ['view_profile',
                'view_application',
                'edit_application',
                'view_event',
                'edit_event',
                'view_act',
                'edit_act'].forEach((permission) => __awaiter(this, void 0, void 0, function* () {
                return yield this.models.Permission.findOrCreate({
                    where: {
                        name: permission
                    }
                });
            }));
            /****
                TEST
            ******/
            yield this.models.ActApplication.findOrCreate({
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
            yield this.models.ActApplication.findOrCreate({
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
        });
    }
    create() {
        return this.db.sync({ force: true })
            .then(function (err) {
            console.log('Database created!');
        }, function (err) {
            console.log('An error occurred while creating the table:', err);
        });
    }
}
exports.Database = Database;
let database = new Database();
exports.default = database;
