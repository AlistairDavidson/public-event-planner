import * as express from 'express';
import * as passport from 'passport';
let passportLocal = require('passport-local');
let LocalStrategy = passportLocal.Strategy;
import * as uuid from 'uuid';

import database from '../common/database';
import { UserInstance } from '../common/models/user';
import authService from './services/auth-service';

export default function(passport: passport.Passport) {  
    passport.serializeUser((user: UserInstance, done: Function) => serializeUser(user, done));

    function serializeUser(user: UserInstance, done: Function) {
        console.log('serialising user', user.get('uuid'));

        done(null, user.get('uuid'));
    }

    // used to deserialize the user
    passport.deserializeUser((uuid: string, done: Function) => deserializeUser(uuid, done));

    async function deserializeUser(uuid: string, done: Function) {
        
        let user = await database.models.User.findOne({
            where: {
                uuid: uuid
            }
        });
    
        console.log('deserialising user', uuid, user);
        
        done(null, user);
    }

    passport.use('local-signup', new LocalStrategy({      
        passReqToCallback : true
    }, async (req: express.Request, username: string, password: string, done: Function) => {
        console.log('local-signup')
        process.nextTick(() => createUser(req, username, password, done));
    }));

    async function createUser(req: express.Request, username: string, password: string, done: Function) {
        console.log('Create User', req, username, password, done);

        let user = await database.models.User.findOne({
            where: {
                username:  username
            }
        });
        
        if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
            let user = await database.models.User.create({
                username: username,
                password: authService.generateHash(password),
                uuid: uuid.v4()
            });
            
            let permission = await database.models.Permission.findOne({
                where: {
                    name: 'view_profile'
                }
            });
            
            await user.addPermission(permission);

            return done(null, user);
        }    
    }
}

passport.use('local-login', new LocalStrategy({
    passReqToCallback : true
},
    function(req: express.Request, username: string, password: string, done: Function) {        
        database.models.User.findOne({
            where: {
                username: username
            }
        }).then((user) => {
            console.log('found user')            
                         
            if (!authService.validPassword(user, password) || !user) {
                return done(null, false, req.flash('loginMessage', 'Username or password incorrect'));
            }

            return done(null, user);
        });
}));

passport.use('local', new LocalStrategy({
    passReqToCallback : true
},
    function(req: express.Request, username: string, password: string, done: Function) {        
        database.models.User.findOne({
            where: {
                username: username
            }
        }).then((user) => {
            console.log('found user')
            
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }
                         
            if (!authService.validPassword(user, password)) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }

            return done(null, user);
        });
}));


