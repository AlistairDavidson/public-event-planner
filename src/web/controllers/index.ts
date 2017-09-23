import * as express from 'express';

import LoginController from './login-controller';
import ApplicationController from './application-controller';
import EventController from './event-controller';
import ActController from './act-controller';
import ContactController from './contact-controller';
import BookingController from './booking-controller';
import LocationController from './location-controller';
import UserController from './user-controller';

export default class Controllers {
    loginController: LoginController;
    applicationController: ApplicationController;
    eventController: EventController;
    actController: ActController;
    contactController: ContactController;
    bookingController: BookingController;
    locationController: LocationController;
    userController: UserController;

    constructor(public app: express.Express) {
        this.loginController = new LoginController(app);
        this.applicationController = new ApplicationController(app);
        this.eventController = new EventController(app);
        this.actController = new ActController(app);
        this.contactController = new ContactController(app);
        this.bookingController = new BookingController(app);
        this.locationController = new LocationController(app);
        this.userController = new UserController(app);
    }    
}