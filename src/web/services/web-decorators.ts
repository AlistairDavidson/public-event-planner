import authService from './auth-service';
import * as express from 'express';
import * as _ from 'lodash';

let routes: Function[] = [];

export function initDecorators(app: express.Application) {
   routes.forEach((route) => route(app));
}

type ControllerMethod = TypedPropertyDescriptor<(req: express.Request, res: express.Response, next: Function, roleId?: string, authorization?: string, permissions?: any) => any>;

/**
 * Decorator, requires a user to have the supplied permissions to access the decorated method.
 */
export function Auth(requirements: string[]) {
    return function Authorise(target: Object, propertyKey: string, descriptor: ControllerMethod) {
        const originalMethod = descriptor.value;
        
       /* descriptor.value = async function(req: express.Request, res: express.Response) {  
            try {                
                let authorization = req.header('Authorization');

                if(!authorization) {
                    throw {
                        status: 401,
                        code: 'NOT_PERMITTED',
                        message: 'Not authorised - no authorization header'
                    };
                }

                let roleId = req.query.roleId || req.body.roleId;

                if(!roleId) {
                    throw {
                        status: 403,
                        code: 'NOT_PERMITTED',
                        message: 'Not authorised - no role'
                    };
                }

                let permissions = await authService.authorize(
                        authorization,
                        roleId,
                        requirements
                    );

                let args = _.toArray(arguments);

                args.push(roleId);
                args.push(authorization);
                args.push(permissions);

                return await originalMethod.apply(this, args);
            } catch(e) {
                handleError(req, res, e);
            }        
        };*/

        return descriptor;
    }
}

/**
 * Decorator, marks a method as GET
 */
export function GET(url: string) {
    return function RecieveGet(target: Object, propertyKey: string, descriptor: ControllerMethod) {
        routes.push((app: express.Application) =>
            app.get(
                url,
                async function(req, res) {
                    try {
                        console.log('GET', url);
                        let data = await descriptor.value.apply(this, arguments);
                        console.log('GOT', data);
                        res.json(data);
                    } catch(e) {
                       handleError(req, res, e);
                    }
                }
            )
        );
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
                async function(req, res) {
                   try {
                        let data = await descriptor.value.apply(this, arguments);
                        console.log('POST', url, data);
                        return res.json(data);
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