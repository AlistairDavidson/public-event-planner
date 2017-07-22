import * as express from 'express';
import * as passport from 'passport';
let passportLocal = require('passport-local');
let LocalStrategy = passportLocal.Strategy;
import * as uuid from 'uuid';

import database from '../common/database';
import { UserInstance } from '../common/models/user';
import authService from './services/auth-service';

export default function(passport: passport.Passport) {  
    passport.serializeUser((user: UserInstance, done: Function) => {
        done(null, user.get('uuid'));
    });

    // used to deserialize the user
    passport.deserializeUser(async(uuid: string, done: Function) => {
        let user = await database.models.User.findOne({
            where: {
                uuid: uuid
            }
        });
        
        done(null, user);
    });

    passport.use('local-signup', new LocalStrategy({      
        passReqToCallback : true
    }, async (req: express.Request, username: string, password: string, done: Function) => {
        console.log('local-signup')
        process.nextTick(() => createUser(req, username, password, done));
    }));

    function createUser(req: express.Request, username: string, password: string, done: Function) {
        console.log('Create User', req, username, password, done)
         database.models.User.findOne({
            where: {
                username:  username
            }
        }).then(user => {
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                database.models.User.create({
                    username: username,
                    password: authService.generateHash(password),
                    uuid: uuid.v4()
                }).then(user => {                
                    return done(null, user);
                });
            }
        })
    }
}


passport.use('local-login', new LocalStrategy({
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
    function(req: express.Request, username: string, password: string, done: Function) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        database.models.User.findOne({
            where: {
                username: username
            }
        }).then((user) => {
            // if no user is found, return the message
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }
             
            // if the user is found but the password is wrong
            if (!authService.validPassword(user, password)) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }

            // all is well, return successful user
            return done(null, user);
        });
}));

