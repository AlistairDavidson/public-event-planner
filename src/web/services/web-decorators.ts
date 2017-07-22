import authService from './auth-service';
import * as express from 'express';
import * as _ from 'lodash';

import * as passport from 'passport';

import { UserInstance } from '../../common/models/user';

let routes: Function[] = [];

export function initDecorators(app: express.Application) {
   routes.forEach((route) => route(app));
}

type ControllerMethod = TypedPropertyDescriptor<(req: express.Request, res: express.Response, next?: Function, user?: UserInstance, permissions?: any) => any>;

/**
 * Decorator, requires a user to have the supplied permissions to access the decorated method.
 */
export function Auth(requirements: string[]) {
    console.log('setting up Auth');
    return function Authorise(target: Object, propertyKey: string, descriptor: ControllerMethod) {
        const originalMethod = descriptor.value;
        // TODO stuff
        descriptor.value = function(req: express.Request, res: express.Response) {  
            console.log('request in auth')
            try {
                return passport.authenticate('local', (req: express.Request, res: express.Response) => {
                    let args = _.toArray(arguments);
                    console.log('doing authorise'); 
                    return doAuthorise(req, res, requirements, originalMethod, args)
                });
            } catch(e) {
                handleError(req, res, e);
            }        
        };

        return descriptor;
    }
}

async function doAuthorise(req: express.Request, res: express.Response, requirements: string[], originalMethod: Function, args: any) {
    console.log('getting permissions', req.user, requirements);
    let permissions = await authService.authorize(req.user, requirements);

    args.push(req.user);
    args.push(permissions);

    console.log('calling original method', req.user, permissions);
    return await originalMethod.apply(this, args);
}

/**
 * Decorator, marks a method as GET
 */
export function GET(url: string) {
    return function RecieveGet(target: Object, propertyKey: string, descriptor: ControllerMethod) {
        routes.push((app: express.Application) => {
            return app.get(
                url,
                async function(req, res) {
                    try {
                        let data = await descriptor.value.apply(this, arguments);
                        console.log('GET', url, data);
                        if(!res.headersSent) {
                            res.json(data);
                        }
                    } catch(e) {
                       handleError(req, res, e);
                    }
                }
            )
        });
    }
}

/**
 * Decorator, marks a method as POST
 */
export function POST(url: string) {
    return function RecievePost(target: Object, propertyKey: string, descriptor: ControllerMethod) {
        routes.push((app: express.Application) =>
            app.post(
                url,
                async  function(req, res) {
                   try {
                        let data = await descriptor.value.apply(this, arguments);
                        console.log('POST', url, data);
                        if(!res.headersSent) {
                            return res.json(data);
                        }
                    } catch(e) {
                        handleError(req, res, e);
                    }
                }
            )
        )
    }
}

function handleError(req: express.Request, res: express.Response, e: any) {
    console.log('Handling error', e)

    // Could be a list of errors - map and return the lot
    if(_.isArray(e)) {
        let errors = e.map((error: any) => {
            return {
                errorCode: error.code || 'NOT_COMPLETED',
                errorMessage: error.message || 'Unknown error',
                statusCode: error.status || 500
            }
        });

        res.status(errors[0].statusCode)
            .json({
                errors: errors
            });
        
        return;
    }

    // Process single error with default values
    let error = {
        errorCode: 'NOT_COMPLETED',
        errorMessage: '',
        statusCode: 500
    }

    if(e.status && e.status != '0') {
        error.statusCode = e.status;
    } 

    res.status(error.statusCode);

    if(e.message) {
        error.errorMessage = e.message;
    } else {
        // This case is for generic errors
        error.errorMessage = e;
    }

    if(e.code) {
        error.statusCode = e.code;
    }
    
    res.json({
        errors: [ error ]
    });   
}

export default {
    Auth: Auth,
    GET: GET,
    POST: POST
}