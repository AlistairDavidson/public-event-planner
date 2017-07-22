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
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, async (req: express.Request, email: string, password: string, done: Function) => {
        process.nextTick(async () => {
            let user = await database.models.User.findOne({
                where: {
                    email:  email
                }
            });
                
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                let user = await database.models.User.create({
                    email: email,
                    password: authService.generateHash(password),
                    uuid: uuid.v4()
                });
                
                return done(null, user);
            }
        });
    }));
}
