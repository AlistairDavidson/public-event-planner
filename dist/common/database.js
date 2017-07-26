"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
const models_1 = require("./models");
class Database {
    constructor() {
        this.models = models_1.default;
    }
    connect() {
        this.db = new SequelizeStatic(process.env.DATABASE_URL, {
            native: true
        });
        try {
            return this.db
                .authenticate()
                .then(function (err) {
                console.log('Database connection has been established successfully.');
            }, function (err) {
                console.log('Unable to connect to the database:', err);
            })
                .then(() => models_1.default.init())
                .then(() => this.db.sync());
        }
        catch (e) {
            console.error(e);
        }
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
