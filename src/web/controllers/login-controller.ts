import * as express from 'express';
import * as passport from 'passport';
import { Auth, GET, POST } from '../services/web-decorators';

export default class LoginController {
    constructor() {
    }

    @GET('/')    
    async index(req: express.Request, res: express.Response) {        
        res.render('index.ejs'); 
    }

    @GET('/login')    
    async login(req: express.Request, res: express.Response) {
        console.log('Hi');
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    }

    @GET('/signup')    
    async signup(req: express.Request, res: express.Response) {
        res.render('signup.ejs', { message: req.flash('signupMessage') }); 
    }

    @GET('/logout')    
    async logout(req: express.Request, res: express.Response) {
        req.logout();
        res.redirect('/');
    }

    @GET('/profile')    
    async profile(req: express.Request, res: express.Response) {
        res.render('profile.ejs', { user: req.user.get() }); 
    }
    
    @POST('/signup')
    async signupPost(req: express.Request, res: express.Response) {
        console.log('signup', req.body);
        passport.authenticate('local-signup')(req, res, function () {
            res.redirect('/profile');
        }); 
    } 
}