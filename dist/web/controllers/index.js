"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_controller_1 = require("./login-controller");
const application_controller_1 = require("./application-controller");
class Controllers {
    constructor(app) {
        this.app = app;
        this.loginController = new login_controller_1.default(app);
        this.applicationController = new application_controller_1.default(app);
    }
}
exports.default = Controllers;
