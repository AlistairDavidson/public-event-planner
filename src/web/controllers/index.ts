import * as express from 'express';

import LoginController from './login-controller';
import ApplicationController from './application-controller';
import EventController from './event-controller';

export default class Controllers {
    loginController: LoginController;
    applicationController: ApplicationController;
    eventController: EventController;

    constructor(public app: express.Express) {
        this.loginController = new LoginController(app);
        this.applicationController = new ApplicationController(app);
        this.eventController = new EventController(app);
    }    
}