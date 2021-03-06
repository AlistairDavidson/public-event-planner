import * as bcrypt from 'bcrypt';
import * as passport from 'passport';
let passportLocal = require('passport-local');
let LocalStrategy = passportLocal.Strategy;
import * as express from 'express';
import * as _ from 'lodash';

import database from '../../common/database';
import * as uuid from 'uuid';
import { UserInstance } from '../../common/models/user';


export class AuthService {
    init(passport: passport.Passport) {
        let self = this;

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
            console.log('Create User', username, password);

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
                    password: self.generateHash(password),
                    uuid: uuid.v4()
                });

                ['view_profile',
                'view_act',
                'edit_act',
                'view_application',
                'edit_application',
                'view_booking',
                'edit_booking',
                'view_contact',
                'edit_contact',
                'view_event',
                'edit_event',
                'view_location',
                'edit_location',
                'view_user',
                'edit_user'].forEach(async permissionName => {
                    let permission = await database.models.Permission.findOne({
                        where: {
                            name: permissionName
                        }
                    });
                
                    await user.addPermission(permission);
                });
                
                return done(null, user);
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
                    console.log('found user', user);            
                                
                    if (!self.validPassword(user, password)) {
                        return done(null, false, req.flash('loginMessage', 'Username or password incorrect'));
                    }

                    return done(null, user);
                });
        }));

        passport.use(new LocalStrategy({
            passReqToCallback : true
        },
            function(req: express.Request, username: string, password: string, done: Function) {        
                database.models.User.findOne({
                    where: {
                        username: username
                    }
                }).then((user) => {
                    console.log('found user')
                    
                    if (!self.validPassword(user, password) || !user) {
                        return done(null, false, req.flash('loginMessage', 'Username or password incorrect'));
                    }
                    return done(null, user);
                });
        }));
    }

    generateHash(password: string) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }

    validPassword(user: UserInstance, password: string) {
        console.log('validating', user.get('username'), password);
        return bcrypt.compareSync(password, user.get('password'));
    }  

   async authorize(user: UserInstance, requirements: string[]) {     
        console.log('Hit authorize');

        if(!user) {
            throw {
                status: 403,
                code: 'NOT_LOGGED_IN',
                message: `User is not logged in`
            }   
        }
        
        let permissions = await this.permissions(user);
   
        console.log('Got permissions', permissions);

        // check if permissions contains one of requirements
        let hasPermission = !!_(permissions)            
            .intersection(requirements)
            .value()
            .length;

        if(!hasPermission) {
            throw {
                status: 403,
                code: 'NOT_PERMITTED',
                message: `User has none of the permissions ${requirements}`
            }
        }

        // if yes, return permissions
        return permissions;
    }

    async permissions(user: UserInstance) {
        let permissions = await user.getPermissions();
        return permissions.map(permission => permission.name);
    }
}

export default new AuthService();