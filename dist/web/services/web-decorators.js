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
const auth_service_1 = require("./auth-service");
const _ = require("lodash");
let routes = [];
function initDecorators(app) {
    routes.forEach((route) => route(app));
}
exports.initDecorators = initDecorators;
/**
 * Decorator, requires a user to have the supplied permissions to access the decorated method.
 */
function Auth(requirements) {
    console.log('setting up Auth');
    return function Authorise(target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        // TODO stuff
        descriptor.value = function (req, res) {
            console.log('request in auth');
            try {
                if (req.isAuthenticated) {
                    let args = _.toArray(arguments);
                    console.log('doing authorise');
                    return doAuthorise(req, res, requirements, originalMethod, args);
                }
            }
            catch (e) {
                handleError(req, res, e);
            }
        };
        return descriptor;
    };
}
exports.Auth = Auth;
function doAuthorise(req, res, requirements, originalMethod, args) {
    return __awaiter(this, void 0, void 0, function* () {
        let permissions = yield auth_service_1.default.authorize(req.user, requirements);
        args.push(req.user);
        args.push(permissions);
        return yield originalMethod.apply(this, args);
    });
}
/**
 * Decorator, marks a method as GET
 */
function GET(url) {
    return function RecieveGet(target, propertyKey, descriptor) {
        routes.push((app) => {
            return app.get(url, function (req, res) {
                return __awaiter(this, arguments, void 0, function* () {
                    try {
                        let data = yield descriptor.value.apply(this, arguments);
                        console.log('GET', url, data);
                        if (!res.headersSent) {
                            res.json(data);
                        }
                    }
                    catch (e) {
                        handleError(req, res, e);
                    }
                });
            });
        });
    };
}
exports.GET = GET;
/**
 * Decorator, marks a method as POST
 */
function POST(url) {
    return function RecievePost(target, propertyKey, descriptor) {
        routes.push((app) => app.post(url, function (req, res) {
            return __awaiter(this, arguments, void 0, function* () {
                try {
                    let data = yield descriptor.value.apply(this, arguments);
                    console.log('POST', url, data);
                    if (!res.headersSent) {
                        return res.json(data);
                    }
                }
                catch (e) {
                    handleError(req, res, e);
                }
            });
        }));
    };
}
exports.POST = POST;
function handleError(req, res, e) {
    console.log('Handling error', e);
    // Could be a list of errors - map and return the lot
    if (_.isArray(e)) {
        let errors = e.map((error) => {
            return {
                status: error.status || 500,
                code: error.code || 'NOT_COMPLETED',
                message: error.message || 'Unknown error'
            };
        });
        res.status(errors[0].status)
            .json({
            errors: errors
        });
        return;
    }
    // Process single error with default values
    let error = {
        status: 500,
        code: 'NOT_COMPLETED',
        message: '',
    };
    if (e.status && e.status != '0') {
        error.status = e.status;
    }
    res.status(error.status);
    if (e.message) {
        error.message = e.message;
    }
    else {
        // This case is for generic errors
        error.message = e;
    }
    if (e.code) {
        error.code = e.code;
    }
    res.json({
        errors: [error]
    });
}
exports.default = {
    Auth: Auth,
    GET: GET,
    POST: POST
};
