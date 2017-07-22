import * as express from 'express';
import * as passport from 'passport';
import { Auth, GET, POST } from '../services/web-decorators';

export default class LoginController {
    constructor(app: express.Application) {
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }));

        app.post('/signup', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }));
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
    @Auth(['view_profile'])    
    async profile(req: express.Request, res: express.Response) {
        res.render('profile.ejs', { user: req.user.get() }); 
    }
}