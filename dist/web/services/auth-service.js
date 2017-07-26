"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
let passportLocal = require('passport-local');
let LocalStrategy = passportLocal.Strategy;
const _ = require("lodash");
const database_1 = require("../../common/database");
const uuid = require("uuid");
class AuthService {
    init(passport) {
        passport.serializeUser((user, done) => serializeUser(user, done));
        function serializeUser(user, done) {
            console.log('serialising user', user.get('uuid'));
            done(null, user.get('uuid'));
        }
        // used to deserialize the user
        passport.deserializeUser((uuid, done) => deserializeUser(uuid, done));
        function deserializeUser(uuid, done) {
            return __awaiter(this, void 0, void 0, function* () {
                let user = yield database_1.default.models.User.findOne({
                    where: {
                        uuid: uuid
                    }
                });
                console.log('deserialising user', uuid, user);
                done(null, user);
            });
        }
        passport.use('local-signup', new LocalStrategy({
            passReqToCallback: true
        }, (req, username, password, done) => __awaiter(this, void 0, void 0, function* () {
            console.log('local-signup');
            process.nextTick(() => createUser(req, username, password, done));
        })));
        function createUser(req, username, password, done) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('Create User', req, username, password, done);
                let user = yield database_1.default.models.User.findOne({
                    where: {
                        username: username
                    }
                });
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                }
                else {
                    let user = yield database_1.default.models.User.create({
                        username: username,
                        password: this.generateHash(password),
                        uuid: uuid.v4()
                    });
                    let permission = yield database_1.default.models.Permission.findOne({
                        where: {
                            name: 'view_profile'
                        }
                    });
                    yield user.addPermission(permission);
                    return done(null, user);
                }
            });
        }
        passport.use('local-login', new LocalStrategy({
            passReqToCallback: true
        }, function (req, username, password, done) {
            database_1.default.models.User.findOne({
                where: {
                    username: username
                }
            }).then((user) => {
                console.log('found user');
                if (!this.validPassword(user, password) || !user) {
                    return done(null, false, req.flash('loginMessage', 'Username or password incorrect'));
                }
                return done(null, user);
            });
        }));
        passport.use(new LocalStrategy({
            passReqToCallback: true
        }, function (req, username, password, done) {
            database_1.default.models.User.findOne({
                where: {
                    username: username
                }
            }).then((user) => {
                console.log('found user');
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
                if (!this.validPassword(user, password)) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                }
                return done(null, user);
            });
        }));
    }
    generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }
    validPassword(user, password) {
        console.log('validating', user.get('username'), password);
        return bcrypt.compareSync(password, user.get('password'));
    }
    authorize(user, requirements) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Hit authorize');
            let permissions = yield this.permissions(user);
            console.log('Got permissions', permissions);
            // check if permissions contains one of requirements
            let hasPermission = !!_(permissions)
                .intersection(requirements)
                .value()
                .length;
            if (!hasPermission) {
                throw {
                    status: 'NOT_PERMITTED',
                    code: 403,
                    message: `User has none of the permissions ${requirements}`
                };
            }
            // if yes, return permissions
            return permissions;
        });
    }
    permissions(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let permissions = yield user.getPermissions();
            return permissions.map(permission => permission.name);
        });
    }
}
exports.AuthService = AuthService;
exports.default = new AuthService();
