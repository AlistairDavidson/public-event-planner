"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers_1 = require("./controllers");
const web_decorators_1 = require("./services/web-decorators");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
let session = require('cookie-session');
const passport = require("passport");
let flash = require('connect-flash');
let fileupload = require('express-fileupload');
const auth_service_1 = require("./services/auth-service");
class WebServer {
    init() {
        this.app = express();
        console.log('Inited app', this.app);
        // Enable cross origin requests
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
        auth_service_1.default.init(passport);
        this.app.use(cookieParser());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw());
        this.app.use(bodyParser.text());
        //this.app.use(fileupload());
        this.app.set('view engine', 'ejs');
        this.app.use(session({ name: 'session', secret: 'V[|.7jC*xE76+z=4bsF8!Jcgj]pu' }));
        this.app.use(passport.initialize());
        this.app.use(passport.session()); // persistent login sessions
        this.app.use(flash()); // use connect-flash for flash messages stored in session
        this.app.use(express.static('dist/static'));
        console.log('Initing decorators');
        web_decorators_1.initDecorators(this.app);
        console.log('Initing controllers');
        this.controllers = new controllers_1.default(this.app);
        this.app.get('/*', (req, res) => res.render('home.ejs'));
        this.server = this.app.listen(process.env.PORT || 8800, () => this.printURL());
    }
    printURL() {
        let host = this.server.address().address;
        let port = this.server.address().port;
        console.log(`Listening at http://${host}:${port}`);
    }
}
exports.WebServer = WebServer;
let webserver = new WebServer();
exports.default = webserver;
