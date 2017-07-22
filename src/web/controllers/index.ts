import * as express from 'express';

import LoginController from './login-controller';

export default class Controllers {
    loginController: LoginController;

    constructor(public app: express.Express) {
        this.loginController = new LoginController();
    }    
}