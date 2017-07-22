import * as express from 'express';
import { Server } from 'http';

import Controllers from './controllers';
import { initDecorators } from './services/web-decorators';

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
let flash = require('connect-flash');
let fileupload = require('express-fileupload');

import configurePassport from './configure-passport';

export class WebServer {
    app: express.Express;
    server: Server;
    controllers: Controllers;

    init() {
	    this.app = express();

        console.log('Inited app', this.app)
    
        // Enable cross origin requests
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });        
        
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        //this.app.use(fileupload());

        this.app.use(session({ secret: 'V[|.7jC*xE76+z=4bsF8!Jcgj]pu' }));
        this.app.use(passport.initialize());


        configurePassport(passport);

        this.app.use(passport.session()); // persistent login sessions
        this.app.use(flash()); // use connect-flash for flash messages stored in session

        this.app.set('view engine', 'ejs');

        console.log('Initing decorators')
        initDecorators(this.app);

        console.log('Initing controllers')
        this.controllers = new Controllers(this.app);

        this.server = this.app.listen(process.env.PORT || 8800, () => this.printURL());
    }

    printURL() {
        let host = this.server.address().address;
        let port = this.server.address().port;

        console.log(`Listening at http://${host}:${port}`);	
    }
}

let webserver = new WebServer();
export default webserver;