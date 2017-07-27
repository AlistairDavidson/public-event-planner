import * as express from 'express';

import LoginController from './login-controller';
import ApplicationController from './application-controller';

export default class Controllers {
    loginController: LoginController;
    applicationController: ApplicationController;

    constructor(public app: express.Express) {
        this.loginController = new LoginController(app);
        this.applicationController = new ApplicationController(app);

    }    
}