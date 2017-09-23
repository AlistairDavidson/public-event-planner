"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_controller_1 = require("./login-controller");
const application_controller_1 = require("./application-controller");
const event_controller_1 = require("./event-controller");
const act_controller_1 = require("./act-controller");
const contact_controller_1 = require("./contact-controller");
const booking_controller_1 = require("./booking-controller");
const location_controller_1 = require("./location-controller");
const user_controller_1 = require("./user-controller");
class Controllers {
    constructor(app) {
        this.app = app;
        this.loginController = new login_controller_1.default(app);
        this.applicationController = new application_controller_1.default(app);
        this.eventController = new event_controller_1.default(app);
        this.actController = new act_controller_1.default(app);
        this.contactController = new contact_controller_1.default(app);
        this.bookingController = new booking_controller_1.default(app);
        this.locationController = new location_controller_1.default(app);
        this.userController = new user_controller_1.default(app);
    }
}
exports.default = Controllers;
